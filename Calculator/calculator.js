let calculation = "";
function calc(value) {
  switch (value) {
    case "c":
      calculation = "";
      document.getElementById("calcscreen").innerText = " ";
      console.log("calculation");
      break;
    case "=":
      if (calculation.startsWith("*") || calculation.startsWith("/"))
        calculation = "";
      else calculation = eval(calculation).toString();
      document.getElementById("calcscreen").innerText = calculation;
      console.log("calculation");
      break;
    case "M":
      calculation = calculation.slice(0, -1);
      document.getElementById("calcscreen").innerText = calculation;
      console.log("calculation");
      break;

    default:
      if (
        ["+", "-", "*", "/"].includes(calculation.at(-1)) &&
        ["+", "-", "*", "/"].includes(value)
      ) {
        return;
      }

      if (
        calculation === "" &&
        (value === "+" || value === "*" || value === "/")
      ) {
        return;
      }
      if (calculation.length >= 20) return;
      calculation += value;
      document.getElementById("calcscreen").innerText = calculation;
      console.log("calculation");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
