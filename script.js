const grades = Object.keys(grade); // from grade.js

function calculateCGPA() {
  let totalCredits = 0;
  let totalWeightedPoints = 0;

  Semester.forEach((sem, semIndex) => {
    let semCredits = 0;
    let semWeightedPoints = 0;

    sem.subjects.forEach((subject, subIndex) => {
      const select = document.getElementById(`grade-${semIndex}-${subIndex}`);
      const selectedGrade = select.value;

      const point = grade[selectedGrade];
      const credit = subject.credit;

      semCredits += credit;
      semWeightedPoints += point * credit;

      totalCredits += credit;
      totalWeightedPoints += point * credit;
    });

    const sgpaElement = document.getElementById(`sgpa-${semIndex}`);
    if (semCredits > 0) {
      const sgpa = (semWeightedPoints / semCredits).toFixed(2);
      sgpaElement.textContent = `SGPA: ${sgpa}`;
    } else {
      sgpaElement.textContent = `SGPA: --`;
    }
  });

  const cgpaElement = document.getElementById("cgpa-result");
  if (totalCredits > 0) {
    const cgpa = (totalWeightedPoints / totalCredits).toFixed(2);
    cgpaElement.textContent = `Your CGPA is: ${cgpa}`;
  } else {
    cgpaElement.textContent = `Your CGPA is: --`;
  }
}

function populateSubjects() {
  const container = document.getElementById("semesters");
  container.innerHTML = "";

  Semester.forEach((sem, semIndex) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semester";

    const title = document.createElement("h3");
    title.textContent = sem.name;
    semDiv.appendChild(title);

    sem.subjects.forEach((subject, subIndex) => {
      const subjectDiv = document.createElement("div");
      subjectDiv.className = "subject";

      const label = document.createElement("label");
      label.textContent = `${subject.name} (${subject.credit} credits): `;
      subjectDiv.appendChild(label);

      const select = document.createElement("select");
      select.id = `grade-${semIndex}-${subIndex}`;

      // Set "U" as default (won't be visible in dropdown)
      const defaultOption = document.createElement("option");
      defaultOption.value = "U";
      defaultOption.textContent = "--";
      select.appendChild(defaultOption);

      // Add all grades including "U"
      grades.forEach(g => {
        const option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        select.appendChild(option);
      });

      subjectDiv.appendChild(select);
      semDiv.appendChild(subjectDiv);
    });

    const sgpaDiv = document.createElement("div");
    sgpaDiv.id = `sgpa-${semIndex}`;
    sgpaDiv.textContent = "SGPA: --";
    sgpaDiv.style.marginTop = "10px";
    semDiv.appendChild(sgpaDiv);

    container.appendChild(semDiv);
  });
}

window.onload = () => {
  populateSubjects();
};
