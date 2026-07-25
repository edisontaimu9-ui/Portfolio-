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
import { useTheme } from '../context/ThemeContext'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const labels = ['Stunting\nunder-5s', 'Wasting\nunder-5s', 'Obesity\nwomen', 'Obesity\nmen']
const malawiData = [35.5, 2.6, 11.0, 2.7]
const africaData = [30.7, 6.0, 20.8, 9.2]

const palettes = {
  dark: {
    malawi: '#2fbfa4', malawiHover: '#36d4b7',
    africa: '#33333c', africaHover: '#3f3f4a',
    tick: '#a8a8b3', axisMuted: '#7a7a86', grid: '#1e1e24',
    tooltipBg: '#18181c', tooltipBorder: '#2a2a34',
    tooltipTitle: '#f5f5f7', tooltipBody: '#a8a8b3',
    legend: '#a8a8b3',
  },
  light: {
    malawi: '#178a75', malawiHover: '#147a67',
    africa: '#e2e2de', africaHover: '#d4d4cf',
    tick: '#55555f', axisMuted: '#7c7c86', grid: '#e6e6e3',
    tooltipBg: '#ffffff', tooltipBorder: '#e6e6e3',
    tooltipTitle: '#16161a', tooltipBody: '#55555f',
    legend: '#55555f',
  },
}

export default function NutritionChart() {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const p = palettes[theme]
    const ctx = canvasRef.current.getContext('2d')

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Malawi',
            data: malawiData,
            backgroundColor: p.malawi,
            hoverBackgroundColor: p.malawiHover,
            borderRadius: 6,
            maxBarThickness: 30,
          },
          {
            label: 'Africa region average',
            data: africaData,
            backgroundColor: p.africa,
            hoverBackgroundColor: p.africaHover,
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
              color: p.legend,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 7,
              padding: 20,
              font: { family: 'Inter', size: 12 },
            },
          },
          tooltip: {
            backgroundColor: p.tooltipBg,
            borderColor: p.tooltipBorder,
            borderWidth: 1,
            titleColor: p.tooltipTitle,
            titleFont: { family: 'Space Grotesk', weight: '600' },
            bodyColor: p.tooltipBody,
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
              color: p.tick,
              font: { family: 'Inter', size: 11 },
            },
            grid: { display: false },
            border: { color: p.grid },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: p.axisMuted,
              font: { family: 'Inter', size: 11 },
              callback: (v) => `${v}%`,
            },
            grid: { color: p.grid },
            border: { display: false },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [theme])

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

