export const metadata = {
  title: "Blogs - Smart Calculator",
  description: "Read latest blogs on tax, EMI, GST and finance tips.",
};
export default function BlogPage() {
  return (
    <article style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#1e3a8a" }}>
        How to Save More Tax in 2025
      </h1>
      <small style={{ color: "#777" }}>Published on August 14, 2025</small>

      <p style={{ marginTop: "1.5rem", lineHeight: "1.8" }}>
        Taxes are a significant part of everyone’s financial life, but with the right strategies,
        you can minimize your tax liability while staying compliant with the law.
      </p>

      <h2 style={{ marginTop: "1.5rem" }}>1. Invest in Tax-Saving Instruments</h2>
      <p>
        Popular options include ELSS funds, PPF, NPS, and tax-saving fixed deposits.
      </p>

      <h2 style={{ marginTop: "1.5rem" }}>2. Claim All Available Deductions</h2>
      <p>
        Make sure you claim deductions under Sections 80C, 80D, and 80E for maximum benefits.
      </p>

      <h2 style={{ marginTop: "1.5rem" }}>3. Consider HRA & Home Loan Benefits</h2>
      <p>
        If you live in a rented property or have a home loan, you can save big through HRA and
        interest deductions.
      </p>

      <p style={{ marginTop: "2rem" }}>
        With proper planning, you can legally reduce your tax burden and save more money for your
        financial goals.
      </p>
    </article>
  );
}
