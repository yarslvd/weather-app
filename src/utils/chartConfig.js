export const data = {
    labels: [],
    datasets: [
        {
            label: 'Temperature',
            data: [],
            borderColor: '#0085FF',
            pointBackgroundColor: '#0085FF',
            pointRadius: 5,
            pointBorderColor: '#fff',
            hitRadius: 15,
            hoverRadius: 7,
            pointBorderWidth: 1,
            tension: 0.3,
            borderCapStyle: 'butt',
            fill: {
                target: true,
                above: 'rgb(0, 133, 255, 0.5)'
            },
        }
    ]
}

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            xAlign: 'center',
            yAlign: 'top',
            backgroundColor: 'rgba(0,0,0,0.6)',
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    family: 'Montserrat',
                    weight: 600
                }
            }
        }
    }
}