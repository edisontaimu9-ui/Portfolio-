import { useEffect, useRef } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const labels = ['Stunting\nunder-5s', 'Wasting\nunder-5s', 'Obesity\nwomen', 'Obesity\nmen']
const malawiData = [35.5, 2.6, 11.0, 2.7]
const africaData = [30.7, 6.0, 20.8, 9.2]

export default function NutritionChart() {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Malawi',
            data: malawiData,
            backgroundColor: '#2fbfa4',
            hoverBackgroundColor: '#36d4b7',
            borderRadius: 6,
            maxBarThickness: 30,
          },
          {
            label: 'Africa region average',
            data: africaData,
            backgroundColor: '#33333c',
            hoverBackgroundColor: '#3f3f4a',
            borderRadius: 6,
            maxBarThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              color: '#a8a8b3',
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 7,
              padding: 20,
              font: { family: 'Inter', size: 12 },
            },
          },
          tooltip: {
            backgroundColor: '#18181c',
            borderColor: '#2a2a34',
            borderWidth: 1,
            titleColor: '#f5f5f7',
            titleFont: { family: 'Space Grotesk', weight: '600' },
            bodyColor: '#a8a8b3',
            bodyFont: { family: 'Inter' },
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: (item) => `${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#a8a8b3',
              font: { family: 'Inter', size: 11 },
            },
            grid: { display: false },
            border: { color: '#1e1e24' },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#7a7a86',
              font: { family: 'Inter', size: 11 },
              callback: (v) => `${v}%`,
            },
            grid: { color: '#1e1e24' },
            border: { display: false },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [])

  return (
    <div className="chart-card">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Bar chart comparing Malawi and Africa-region averages for stunting, wasting, and obesity among women and men"
      />
    </div>
  )
}
