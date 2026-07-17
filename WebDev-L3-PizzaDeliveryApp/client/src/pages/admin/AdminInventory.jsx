import { useEffect, useState } from "react";
import { getAllInventoryAdmin, updateInventoryItem } from "../../api/inventoryApi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const CATEGORIES = ["base", "sauce", "cheese", "vegetable"];

function AdminInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ stock: "", threshold: "" });
  const [savingId, setSavingId] = useState(null);

  const loadInventory = () => {
    getAllInventoryAdmin()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditValues({ stock: item.stock, threshold: item.threshold });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    setSavingId(id);
    try {
      const res = await updateInventoryItem(id, {
        stock: Number(editValues.stock),
        threshold: Number(editValues.threshold),
      });
      setItems((prev) => prev.map((item) => (item._id === id ? res.data : item)));
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update item");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-center text-muted py-10">Loading inventory...</p>;

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal mb-6">Inventory Dashboard</h1>

        {CATEGORIES.map((category) => {
          const categoryItems = items.filter((i) => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold text-charcoal mb-3 capitalize">{category}s</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryItems.map((item) => {
                  const isLow = item.stock < item.threshold;
                  const isEditing = editingId === item._id;

                  return (
                    <Card key={item._id} className={isLow ? "border-2 border-warning" : ""}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-charcoal">{item.name}</span>
                        {isLow && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-warning/20 text-warning">
                            Low Stock
                          </span>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            label="Stock"
                            type="number"
                            value={editValues.stock}
                            onChange={(e) => setEditValues({ ...editValues, stock: e.target.value })}
                          />
                          <Input
                            label="Threshold"
                            type="number"
                            value={editValues.threshold}
                            onChange={(e) => setEditValues({ ...editValues, threshold: e.target.value })}
                          />
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => saveEdit(item._id)}
                              disabled={savingId === item._id}
                            >
                              {savingId === item._id ? "Saving..." : "Save"}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={cancelEditing}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-muted mb-1">
                            Stock: <span className="font-semibold text-charcoal">{item.stock}</span>
                          </p>
                          <p className="text-sm text-muted mb-3">
                            Threshold: <span className="font-semibold text-charcoal">{item.threshold}</span>
                          </p>
                          <Button size="sm" variant="outline" onClick={() => startEditing(item)}>
                            Update
                          </Button>
                        </>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminInventory;