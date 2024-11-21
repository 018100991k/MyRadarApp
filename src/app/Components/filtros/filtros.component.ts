import { Component } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent {
  mostrarInformacion = true; // Por defecto, muestra la información
  constructor() {
    google.charts.load('current', { packages: ['corechart', 'geochart'] });
  }

  // Función para realizar la búsqueda
  buscar() {
    const camposSeleccionados = [];

    // Obtener todos los elementos de selección
    const selects = document.querySelectorAll('.seleccionables select');

    // Recorrer los elementos de selección y agregar los valores seleccionados al arreglo
    selects.forEach((select: any) => {
      if (select.value !== '' && select.value !== 'seleccione') {
        camposSeleccionados.push({
          id: select.id,
          valor: select.value,
        });
      }
    });

    // Obtener todos los elementos de casillas de verificación
    const checkboxes = document.querySelectorAll(
      '.checkeables input[type="checkbox"]'
    );

    // Recorrer los elementos de casillas de verificación y agregar los valores seleccionados al arreglo
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        camposSeleccionados.push({
          id: checkbox.id,
          valor: checkbox.value,
        });
      }
    });

    const campoBusqueda = (
      document.getElementById('campoBusqueda') as HTMLInputElement
    ).value;

    if (campoBusqueda.trim() !== '') {
      camposSeleccionados.unshift({
        id: 'campoBusqueda',
        valor: campoBusqueda,
      });
    }
    alert(
      'Campos seleccionados:\n' +
        camposSeleccionados.map((item) => item.id).join('\n')
      // camposSeleccionados.map((item) => item.valor).join('\n')
    );
    // Mostrar la información en un alert
    // alert(
    //   'Campos seleccionados:\n' + JSON.stringify(camposSeleccionados, null, 2)
    // );
    // Ocultar la información y mostrar los gráficos
    this.mostrarInformacion = false;

    google.charts.setOnLoadCallback(() => {
      this.mostrarGraficos.bind(this);
    });
  }
  // Función para mostrar los gráficos de Google Charts
  mostrarGraficos(tipoGrafico: string) {
    // Asegúrate de que el contenedor esté disponible antes de intentar crear el gráfico.
    const container = document.getElementById('grafico'); // Reemplaza 'nombreDelContenedor' con el ID real de tu contenedor.

    if (container) {
      const data = new google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ]);
      const dataMap = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700],
      ]);
      const options = {
        // title: 'My Chart',
        width: 800,
        height: 500,
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
        title: 'Title',
        // subtitle: 'based on hours studied',
      };
      let chart;
      // Selecciona el tipo de gráfico según el parámetro

      switch (tipoGrafico) {
        case 'PieChart':
          chart = new google.visualization.PieChart(container);
          chart.draw(data, options);
          break;
        case 'BarChart':
          chart = new google.visualization.BarChart(container);
          chart.draw(data, options);
          break;
        case 'ColumnChart':
          chart = new google.visualization.ColumnChart(container);
          chart.draw(data, options);
          break;
        case 'LineChart':
          chart = new google.visualization.LineChart(container);
          chart.draw(data, options);
          break;
        case 'AreaChart':
          chart = new google.visualization.AreaChart(container);
          chart.draw(data, options);
          break;
        case 'ScatterChart':
          chart = new google.visualization.ScatterChart(container);
          chart.draw(data, options);
          break;
        case 'SteppedAreaChart':
          chart = new google.visualization.SteppedAreaChart(container);
          chart.draw(data, options);
          break;
        case 'ComboChart':
          chart = new google.visualization.ComboChart(container);
          chart.draw(data, options);
          break;
        case 'Histogram':
          chart = new google.visualization.Histogram(container);
          chart.draw(data, options);
          break;
        case 'GeoChart':
          chart = new google.visualization.GeoChart(container);
          chart.draw(dataMap, options);
          break;

        // Agrega más casos según sea necesario para otros tipos de gráficos
        default:
          console.error('Tipo de gráfico no reconocido.');
          return;
      }
    } else {
      console.error('Contenedor no encontrado.');
    }
  }
  // Función para resetear los campos
  resetCampos() {
    // Resetear campos de selección
    const selects = document.querySelectorAll('.seleccionables select');
    selects.forEach((select: any) => {
      select.value = ''; // Puedes establecer el valor predeterminado aquí si es necesario
    });

    // Desmarcar casillas de verificación
    const checkboxes = document.querySelectorAll(
      '.checkeables input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });

    // Limpiar campo de búsqueda
    (document.getElementById('campoBusqueda') as HTMLInputElement).value = '';
  }
}
