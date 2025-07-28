function calculateCGPA() {
  let totalCredits = 0;
  let weightedSum = 0;

  Semester.forEach((sem, semIndex) => {
    let semCredits = 0;
    let semWeightedSum = 0;

    sem.subjects.forEach((subject, subIndex) => {
      const select = document.getElementById(`grade-${semIndex}-${subIndex}`);
      const selectedGrade = select.value;

      if (selectedGrade !== "none") {
        const gradePoint = grade[selectedGrade];
        semWeightedSum += gradePoint * subject.credit;
        semCredits += subject.credit;
        weightedSum += gradePoint * subject.credit;
        totalCredits += subject.credit;
      }
    });

    const sgpa = semCredits > 0 ? (semWeightedSum / semCredits).toFixed(2) : "N/A";
    const sgpaDisplay = document.getElementById(`sgpa-${semIndex}`);
    if (sgpaDisplay) sgpaDisplay.textContent = `SGPA: ${sgpa}`;
  });

  const cgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "N/A";
  document.getElementById("cgpa-result").textContent = `Your CGPA is: ${cgpa}`;
}

function populateSubjects() {
  const container = document.getElementById("semesters");
  container.innerHTML = ""; // Clear any existing content

  Semester.forEach((sem, semIndex) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semester";

    const semTitle = document.createElement("h3");
    semTitle.textContent = sem.name;
    semDiv.appendChild(semTitle);

    sem.subjects.forEach((subject, subIndex) => {
      const subjectDiv = document.createElement("div");
      subjectDiv.className = "subject";

      const label = document.createElement("label");
      label.textContent = `${subject.name} (${subject.credit} credits):`;
      subjectDiv.appendChild(label);

      const select = document.createElement("select");
      select.id = `grade-${semIndex}-${subIndex}`;

      const defaultOption = document.createElement("option");
      defaultOption.value = "none";
      defaultOption.textContent = "--";
      select.appendChild(defaultOption);

      grades.forEach(g => {
        const option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        select.appendChild(option);
      });

      subjectDiv.appendChild(select);
      semDiv.appendChild(subjectDiv);
    });

    // SGPA Display
    const sgpaResult = document.createElement("div");
    sgpaResult.id = `sgpa-${semIndex}`;
    sgpaResult.className = "sgpa-result";
    sgpaResult.textContent = "SGPA: --";
    semDiv.appendChild(sgpaResult);

    container.appendChild(semDiv);
  });
}

window.onload = () => {
  populateSubjects();
};
