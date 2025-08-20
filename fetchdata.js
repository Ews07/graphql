fetchProfileData()
  .then(data => {
    // 1. Basic info
    const user = data.user[0];
    document.getElementById("username").textContent = user.login;

    // 2. XP
    const totalXP = data.xpTotal.aggregate.sum.amount;
    document.getElementById("xpTotal").textContent = `Total XP: ${totalXP}`;

    // 3. Audit ratio
    const up = data.auditUp.aggregate.sum.amount || 0;
    const down = data.auditDown.aggregate.sum.amount || 0;
    const ratio = down === 0 ? "∞" : (up / down).toFixed(2);
    document.getElementById("auditRatio").textContent = `Audit Ratio: ${ratio}`;

    // 4. Skills / Progress
    const skillsList = document.getElementById("skillsList");
    data.progress.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.object.name} → Grade: ${p.grade}`;
      skillsList.appendChild(li);
    });

    // Example: you can also use xpByProject to draw SVG charts
    console.log("XP by Project:", data.xpByProject);
  })
  .catch(err => {
    console.error("Error:", err);
  });
