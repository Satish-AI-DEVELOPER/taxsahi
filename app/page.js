export default function Home() {
  const blogs = [
    {
      title: "How to Save More Tax in 2025",
      description: "Explore the latest strategies to reduce your tax burden legally and efficiently.",
      date: "August 14, 2025",
      link: "/blog/save-tax-2025"
    },
    {
      title: "Smart Monthly Budgeting Guide",
      description: "Practical budgeting tips to help you achieve financial freedom faster.",
      date: "August 10, 2025",
      link: "/blog/monthly-budget-guide"
    },
    {
      title: "EMI vs. Lump Sum: Which is Better?",
      description: "Understand the pros and cons of EMI payments versus lump sum investments.",
      date: "August 5, 2025",
      link: "/blog/emi-vs-lumpsum"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Smart Calculator</h1>
        <p>One tool for all your financial calculations</p>
        <a href="/tools/calculator">Open Calculator</a>
      </section>

      {/* Blog Section */}
      <section className="tools">
        <h2>Daily Financial Insights</h2>
        <div className="tool-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="tool-card">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <small style={{ display: "block", marginBottom: "0.5rem", color: "#777" }}>
                {blog.date}
              </small>
              <a href={blog.link}>Read More</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
