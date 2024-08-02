import {Component, ElementRef, inject, Input, OnInit, signal, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import Chart from "chart.js/auto";
import {DataProcService} from './../../services/data-proc.service';
import {GlobalProviderService} from "@services/global-provider.service";

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit {
  private el: ElementRef;
  radarCtx: HTMLHtmlElement | any;

  private provider = inject(GlobalProviderService)

  data = signal([1, 1, 1, 1])

  ngOnInit() {

    this.radarCtx = this.el.nativeElement.querySelector(".myChart").getContext("2d")

    // console.log("this.provider.scores()");
    // console.log(this.provider.scores());
    this.data.set(this.provider.scores())

    const radarChart = new Chart(this.radarCtx, {
      type: "radar",
      data: this.radarData,
      options: this.radarOptions,
    });

    // this.dataService.getData().subscribe((data: any[]) => {
    //   this.data = data;
    // });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes")
    console.log(changes)
  }

  radarData = {
    labels: [
      "Coherencia del modelo de negocio",
      "Salud financiera",
      "Conocimiento del cliente",
      "Alineación en la comunicación interna",
      "Conocimiento del negocio",
    ],
    datasets: [
      {
        label: "Tu Radar",
        data: [2, 1, 2, 3, 2],
        fill: true,
        backgroundColor: "rgba(91, 100, 175, 0.2)",
        borderColor: "#5B64AF",
        pointBackgroundColor: "#5B64AF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#5B64AF",
      },
      {
        label: "Ideal",
        data: [4, 4, 4, 4, 4],
        fill: false,
        backgroundColor: "rgba(88, 176, 168, 0.2)",
        borderColor: "#58B0A8",
        pointBackgroundColor: "#58B0A8",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#58B0A8",
      },
    ],
  };
  radarOptions = {
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Lato",
          },
        },
      },
    },
    scales: {
      r: {
        ticks: {
          z: 10,
          beginAtZero: true,
          max: 4,
          stepSize: 1,
          font: {
            size: 16,
            family: "Lato",
          },
        },
        pointLabels: {
          font: {
            size: 16,
            color: "black",
            family: "Lato",
          },
        },
      },
    },
  };

  constructor(el: ElementRef) {
    this.el = el;

  }

}
