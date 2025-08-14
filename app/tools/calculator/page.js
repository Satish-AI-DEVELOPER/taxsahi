"use client";
import { useMemo, useState } from "react";

// Currency formatter (₹)
const fmt = (n) =>
  isFinite(n)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n)
    : "—";

export default function SmartCalculator() {
  // UI state
  const [tab, setTab] = useState("income"); // income | gst | emi

  // Common inputs
  const [amount, setAmount] = useState("");        // income / principal / base amount
  const [rate, setRate] = useState("18");          // gst% / annual%
  const [tenureY, setTenureY] = useState("5");     // years
  const [tenureMode, setTenureMode] = useState("years"); // years | months
  const [tenureM, setTenureM] = useState("60");

  // Income tax extras
  const [slabRegime, setSlabRegime] = useState("old"); // old | simple (demo)
  const [rebate, setRebate] = useState(false);         // Apply 87A (demo toggle)

  // GST extras
  const [gstMode, setGstMode] = useState("add"); // add GST to base OR remove from MRP

  // EMI extras
  const [repayFreq, setRepayFreq] = useState("monthly"); // monthly | yearly

  /* ================= INCOME TAX (demo slabs) ================= */
  const incomeTax = useMemo(() => {
    const inc = parseFloat(amount || "0");
    if (!isFinite(inc) || inc < 0) return { tax: 0, eff: 0, rows: [] };

    // DEMO slabs (simplified OLD-regime-ish)
    let rows = [];
    let tax = 0;

    const push = (label, base, rate) => {
      const val = Math.max(Math.min(inc, base.max) - base.min, 0);
      const slabTax = val * rate;
      tax += slabTax;
      rows.push({ label, amount: val, rate: rate * 100, tax: slabTax });
    };

    if (slabRegime === "old") {
      push("0 – 2.5L", { min: 0, max: 250000 }, 0);
      push("2.5L – 5L", { min: 250000, max: 500000 }, 0.05);
      push("5L – 10L", { min: 500000, max: 1000000 }, 0.20);
      push("10L+", { min: 1000000, max: Infinity }, 0.30);
    } else {
      // "simple" demo: 0–3L:0%, 3–7L:5%, 7–10L:10%, 10–12L:15%, 12–15L:20%, 15L+:30%
      push("0 – 3L", { min: 0, max: 300000 }, 0);
      push("3L – 7L", { min: 300000, max: 700000 }, 0.05);
      push("7L – 10L", { min: 700000, max: 1000000 }, 0.10);
      push("10L – 12L", { min: 1000000, max: 1200000 }, 0.15);
      push("12L – 15L", { min: 1200000, max: 1500000 }, 0.20);
      push("15L+", { min: 1500000, max: Infinity }, 0.30);
    }

    // Demo rebate toggle
    if (rebate && inc <= 500000) tax = 0;

    const eff = inc > 0 ? (tax / inc) * 100 : 0;
    return { tax, eff, rows };
  }, [amount, slabRegime, rebate]);

  /* ================= GST ================= */
  const gstCalc = useMemo(() => {
    const base = parseFloat(amount || "0");
    const r = (parseFloat(rate || "0") || 0) / 100;
    if (!isFinite(base) || base < 0) return { gst: 0, gross: 0, baseFromMrp: 0 };

    if (gstMode === "add") {
      const gst = base * r;
      const gross = base + gst;
      return { gst, gross, baseFromMrp: 0 };
    } else {
      // remove from MRP
      const baseFromMrp = base / (1 + r);
      const gst = base - baseFromMrp;
      return { gst, gross: base, baseFromMrp };
    }
  }, [amount, rate, gstMode]);

  /* ================= EMI ================= */
  const emiCalc = useMemo(() => {
    const P = parseFloat(amount || "0");
    const i = (parseFloat(rate || "0") || 0) / 100;

    const n =
      tenureMode === "years"
        ? Math.max(0, Math.round((parseFloat(tenureY || "0") || 0) * 12))
        : Math.max(0, Math.round(parseFloat(tenureM || "0") || 0));

    const r = repayFreq === "monthly" ? i / 12 : i; // monthly or yearly compounding (simple)
    if (P <= 0 || r < 0 || n <= 0) return { emi: 0, totalInt: 0, totalPay: 0, months: n };

    // EMI formula
    const emi = r === 0
      ? P / n
      : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPay = emi * n;
    const totalInt = totalPay - P;

    return { emi, totalInt, totalPay, months: n };
  }, [amount, rate, tenureMode, tenureY, tenureM, repayFreq]);

  /* ================= RENDER ================= */
  return (
    <div className="container-narrow">
      <h1 style={{ textAlign: "center", marginBottom: "1.25rem" }}>💡 Smart Financial Calculator</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={`btn ${tab === "income" ? "primary" : "ghost"}`} onClick={() => setTab("income")}>Income Tax</button>
        <button className={`btn ${tab === "gst" ? "primary" : "ghost"}`} onClick={() => setTab("gst")}>GST</button>
        <button className={`btn ${tab === "emi" ? "primary" : "ghost"}`} onClick={() => setTab("emi")}>EMI</button>
      </div>

      <div className="panel">
        {/* COMMON AMOUNT */}
        <div className="row">
          <div className="label">{tab === "emi" ? "Principal (₹)" : tab === "gst" ? (gstMode === "add" ? "Base Amount (₹)" : "MRP (₹)") : "Annual Income (₹)"}</div>
          <input
            className="input"
            type="number"
            min="0"
            placeholder="e.g. 750000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* ===== INCOME TAX OPTIONS ===== */}
        {tab === "income" && (
          <>
            <div className="row inline">
              <div>
                <div className="label">Regime</div>
                <div className="pill-toggle" role="tablist" aria-label="Regime">
                  <button
                    className={slabRegime === "old" ? "active" : ""}
                    onClick={() => setSlabRegime("old")}
                  >Old</button>
                  <button
                    className={slabRegime === "simple" ? "active" : ""}
                    onClick={() => setSlabRegime("simple")}
                  >Simple (demo)</button>
                </div>
              </div>

              <div>
                <div className="label">Rebate 87A</div>
                <div className="pill-toggle" aria-label="Rebate">
                  <button
                    className={rebate ? "active" : ""}
                    onClick={() => setRebate(true)}
                  >On</button>
                  <button
                    className={!rebate ? "active" : ""}
                    onClick={() => setRebate(false)}
                  >Off</button>
                </div>
                <div className="help">Demo: if income ≤ ₹5L, tax → 0 when On.</div>
              </div>
            </div>

            {/* Results */}
            <div className="stats">
              <div className="stat">
                <h4>Estimated Tax</h4>
                <div className="val">{fmt(incomeTax.tax)}</div>
              </div>
              <div className="stat">
                <h4>Effective Rate</h4>
                <div className="val">{incomeTax.eff.toFixed(2)}%</div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Slab</th><th>Amount</th><th>Rate</th><th>Tax</th>
                </tr>
              </thead>
              <tbody>
                {incomeTax.rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.label}</td>
                    <td>{fmt(r.amount)}</td>
                    <td>{r.rate}%</td>
                    <td>{fmt(r.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ===== GST OPTIONS ===== */}
        {tab === "gst" && (
          <>
            <div className="row">
              <div className="label">Mode</div>
              <div className="pill-toggle">
                <button className={gstMode === "add" ? "active" : ""} onClick={() => setGstMode("add")}>Add GST</button>
                <button className={gstMode === "remove" ? "active" : ""} onClick={() => setGstMode("remove")}>Remove from MRP</button>
              </div>
            </div>

            <div className="row">
              <div className="label">GST %</div>
              <div className="btn-group">
                {[5, 12, 18, 28].map((r) => (
                  <button key={r} className={`btn ${parseFloat(rate)===r ? "primary" : ""}`} onClick={() => setRate(String(r))}>{r}%</button>
                ))}
                <select className="select" value={rate} onChange={(e) => setRate(e.target.value)}>
                  <option value="0">Custom %</option>
                  <option value="3">3%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>

            <div className="stats">
              {gstMode === "add" ? (
                <>
                  <div className="stat"><h4>GST Amount</h4><div className="val">{fmt(gstCalc.gst)}</div></div>
                  <div className="stat"><h4>Total (Incl. GST)</h4><div className="val">{fmt(gstCalc.gross)}</div></div>
                </>
              ) : (
                <>
                  <div className="stat"><h4>Base (Excl. GST)</h4><div className="val">{fmt(gstCalc.baseFromMrp)}</div></div>
                  <div className="stat"><h4>GST Part</h4><div className="val">{fmt(gstCalc.gst)}</div></div>
                </>
              )}
            </div>
          </>
        )}

        {/* ===== EMI OPTIONS ===== */}
        {tab === "emi" && (
          <>
            <div className="row inline">
              <div>
                <div className="label">Interest Rate (%)</div>
                <input className="input" type="number" min="0" step="0.01" placeholder="e.g. 10" value={rate} onChange={(e) => setRate(e.target.value)} />
                <div className="help">Annual nominal rate</div>
              </div>

              <div>
                <div className="label">Tenure Mode</div>
                <div className="pill-toggle" style={{ marginBottom: ".5rem" }}>
                  <button className={tenureMode === "years" ? "active" : ""} onClick={() => setTenureMode("years")}>Years</button>
                  <button className={tenureMode === "months" ? "active" : ""} onClick={() => setTenureMode("months")}>Months</button>
                </div>

                {tenureMode === "years" ? (
                  <input className="input" type="number" min="0" step="1" placeholder="e.g. 5" value={tenureY} onChange={(e) => setTenureY(e.target.value)} />
                ) : (
                  <input className="input" type="number" min="0" step="1" placeholder="e.g. 60" value={tenureM} onChange={(e) => setTenureM(e.target.value)} />
                )}
              </div>
            </div>

            <div className="row">
              <div className="label">Repayment Frequency</div>
              <div className="pill-toggle">
                <button className={repayFreq === "monthly" ? "active" : ""} onClick={() => setRepayFreq("monthly")}>Monthly</button>
                <button className={repayFreq === "yearly" ? "active" : ""} onClick={() => setRepayFreq("yearly")}>Yearly</button>
              </div>
            </div>

            <div className="stats">
              <div className="stat"><h4>EMI</h4><div className="val">{fmt(emiCalc.emi)}</div></div>
              <div className="stat"><h4>Total Interest</h4><div className="val">{fmt(emiCalc.totalInt)}</div></div>
              <div className="stat"><h4>Total Payable</h4><div className="val">{fmt(emiCalc.totalPay)}</div></div>
              <div className="stat"><h4>Tenure (months)</h4><div className="val">{emiCalc.months}</div></div>
            </div>
          </>
        )}

        {/* ACTIONS */}
        <div className="copy-wrap">
          <button
            className="btn"
            onClick={() => {
              const text =
                tab === "income"
                  ? `Income Tax: ${fmt(incomeTax.tax)} (Eff: ${incomeTax.eff.toFixed(2)}%)`
                  : tab === "gst"
                  ? (gstMode === "add"
                      ? `GST: ${fmt(gstCalc.gst)}, Total: ${fmt(gstCalc.gross)}`
                      : `Base: ${fmt(gstCalc.baseFromMrp)}, GST: ${fmt(gstCalc.gst)}`)
                  : `EMI: ${fmt(emiCalc.emi)}, Total Interest: ${fmt(emiCalc.totalInt)}, Total Payable: ${fmt(emiCalc.totalPay)}`;
              navigator.clipboard.writeText(text);
            }}
          >
            Copy Result
          </button>

          <button
            className="btn"
            onClick={() => {
              setAmount("");
              setRate(tab === "gst" ? "18" : "10");
              setTenureY("5");
              setTenureM("60");
              setRebate(false);
            }}
          >
            Reset
          </button>
        </div>

        {/* Small guidance */}
        <div className="notice">
          Estimates are for quick planning. For official slabs/rules, verify with the latest govt circulars.
        </div>
      </div>
    </div>
  );
}
