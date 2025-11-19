import { useEffect, useState, useRef } from "react";

export default function WeightPage() {
  const [weight, setWeight] = useState(0);

  // category ranges
  const [categories, setCategories] = useState({
    cat1: { min: 1, max: 3 },
    cat2: { min: 5.5, max: 7 },
    cat3: { min: 7, max: 10 },
    cat4: { min: 11, max: 14 },
    cat5: { min: 16, max: 17 },
    cat6: { min: 17.5, max: 21 },
    cat7: { min: 21.7, max: 22 },
    cat8: { min: 23, max: 24 },
    cat9: { min: 27, max: 31 },
    cat10: { min: 36, max: 37 },
    cat11: { min: 39, max: 41 },
  });

  // how close (in kg) counts as "near" range → marked with *
  const [tolerance, setTolerance] = useState(1.0);

  const [category, setCategory] = useState("Empty");

  // connect to Node-RED for weight
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1880/ws/weight");

    ws.onopen = () => console.log("✅ Connected to weight WebSocket");
    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setWeight(parsed.weight ?? 0);
      } catch {
        console.error("Invalid data:", event.data);
      }
    };
    ws.onerror = (err) => console.error("Weight WS error:", err);
    ws.onclose = () => console.warn("Weight WS closed");
    return () => ws.close();
  }, []);

  // WebSocket for sending category back to Node-RED
  const categorySocket = useRef(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1880/ws/category");
    ws.onopen = () => console.log("✅ Connected to category WebSocket");
    ws.onerror = (err) => console.error("Category WS error:", err);
    ws.onclose = () => console.warn("Category WS closed");
    categorySocket.current = ws;
    return () => ws.close();
  }, []);

  // compute category each time weight changes
  useEffect(() => {
    if (weight === 0) {
      setCategory("Empty");
      return;
    }

    const rangeEntries = Object.entries(categories);
    let found = null;
    let closest = null;
    let minDistance = Infinity;

    for (const [key, range] of rangeEntries) {
      const { min, max } = range;

      // inside category range
      if (weight >= min && weight <= max) {
        found = key.replace("cat", "");
        break;
      }

      // compute distance from range
      const distance =
        weight < min ? Math.abs(weight - min) : Math.abs(weight - max);
      if (distance < minDistance) {
        minDistance = distance;
        closest = key.replace("cat", "");
      }
    }

    // decide final category
    let newCategory = "Unknown";
    if (found) {
      newCategory = found;
    } else if (minDistance <= tolerance && closest) {
      newCategory = `${closest}*`;
    }

    setCategory(newCategory);

    // send category to Node-RED
    if (categorySocket.current?.readyState === WebSocket.OPEN) {
      categorySocket.current.send(JSON.stringify({ category: newCategory }));
    }
  }, [weight, categories, tolerance]);
  return (
    <main className="flex-1 p-1 overflow-auto">
      <div className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2 flex justify-center items-center">
        <h3 className="font-bold text-2xl">Weighting System</h3>
        <div className="flex justify-center"></div>
      </div>
      <div className="p-4 space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">
          Weight: {weight.toFixed(2)} kg
        </h2>
        <h3 className="text-lg">
          Category:{" "}
          <span
            className={
              category.includes("*")
                ? "text-orange-500"
                : category === "Unknown"
                ? "text-red-500"
                : category === "Empty"
                ? "text-gray-400"
                : "text-green-600"
            }
          >
            {category}
          </span>
        </h3>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Edit Category Ranges</h4>
          {Object.entries(categories).map(([key, range]) => (
            <div key={key} className="flex items-center space-x-2 mb-2">
              <label className="w-12">{key.toUpperCase()}:</label>
              <input
                type="number"
                step="0.01"
                value={range.min}
                onChange={(e) =>
                  setCategories((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], min: parseFloat(e.target.value) },
                  }))
                }
                className="border p-1 rounded w-20"
              />
              <span>to</span>
              <input
                type="number"
                step="0.01"
                value={range.max}
                onChange={(e) =>
                  setCategories((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], max: parseFloat(e.target.value) },
                  }))
                }
                className="border p-1 rounded w-20"
              />
            </div>
          ))}

          <div className="mt-4">
            <label className="font-medium mr-2">Near tolerance (kg):</label>
            <input
              type="number"
              step="0.1"
              value={tolerance}
              onChange={(e) => setTolerance(parseFloat(e.target.value))}
              className="border p-1 rounded w-24"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
