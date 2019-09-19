var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
        datasets: [{
            label: '苏超',
            data: [12, 19, 3, 5, 2, 3,1],
            backgroundColor:"transparent",
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
            borderColor:"black",
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
        },
            {
                label: '蒋婷',
                data: [20, 35, 5, 6, 4, 2,8],
                backgroundColor:"transparent",
                borderColor:"red",
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
