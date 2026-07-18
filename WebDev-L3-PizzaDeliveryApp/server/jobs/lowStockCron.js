import cron from "node-cron";
import Inventory from "../models/Inventory.js";
import { sendEmail } from "../utils/sendEmail.js";

export const startLowStockCron = () => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("[cron] Running low-stock inventory check...");

    try {
      const lowStockItems = await Inventory.find({
        $expr: { $lt: ["$stock", "$threshold"] },
        lowStockAlertSent: false,
      });

      if (lowStockItems.length === 0) {
        console.log("[cron] No new low-stock items to alert on.");
        return;
      }

      const itemListHtml = lowStockItems
        .map((item) => `<li>${item.name} (${item.category}) — ${item.stock} left (threshold: ${item.threshold})</li>`)
        .join("");

      await sendEmail({
        to: process.env.EMAIL_USER, // sending the alert to the admin's own configured email
        subject: `Low Stock Alert — ${lowStockItems.length} item(s) need attention`,
        html: `
          <p>The following inventory items have fallen below their restock threshold:</p>
          <ul>${itemListHtml}</ul>
          <p>Please update stock levels in the admin dashboard.</p>
        `,
      });

      const ids = lowStockItems.map((item) => item._id);
      await Inventory.updateMany({ _id: { $in: ids } }, { lowStockAlertSent: true });

      console.log(`[cron] Sent low-stock alert for ${lowStockItems.length} item(s).`);
    } catch (error) {
      console.error("[cron] Low-stock check failed:", error.message);
    }
  });

  console.log("[cron] Low-stock monitoring job scheduled (every 30 minutes).");
};