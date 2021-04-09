import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import "moment/locale/es";

import { dataParroquia } from "../../../../utils/dataVariables";

const generatePDF = (registers) => {
  const doc = new jsPDF();

  const tableColumn = [
    "Asientos",
    "Lugares",
    "Nombre",
    // "Confirm",
    "Misa",
    "Fecha",
    "Hora",
  ];

  const tableRows = [];

  registers.forEach((element) => {
    const registerData = [
      `${element.currentSeats} - ${element.currentSeats + element.seats - 1}`,
      element.seats,
      element.name,
      // element.confirm,
      element.eventName,
      moment(element.eventDate).format("ddd DD/MMM/YY"),
      element.hour,
    ];
    tableRows.push(registerData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 15 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text("Personas Registradas para Misa | " + dataParroquia, 15, 10);
  doc.save(`Registro_${dateStr}.pdf`);
};

export default generatePDF;
