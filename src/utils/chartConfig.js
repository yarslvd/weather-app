export const data = {
    labels: [],
    datasets: [
        {
            label: 'Temperature',
            data: [],
            borderColor: '#0085FF',
            pointBackgroundColor: '#0085FF',
            pointRadius: 1,
            // pointBorderColor: '#fff',
            hitRadius: 15,
            hoverRadius: 7,
            // pointBorderWidth: 2,
            tension: 0.4,
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
    },
    interaction: {
        intersect: false,
        mode: 'index',
    }
}

export const plugins = [{
    afterDraw: chart => {
        if (chart.tooltip?._active?.length) {
            let x = chart.tooltip._active[0].element.x;
            let yAxis = chart.scales.y;
            let ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, yAxis.top);
            ctx.lineTo(x, yAxis.bottom);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#007be3';
            ctx.stroke();
            ctx.restore();
        }
    }
}]