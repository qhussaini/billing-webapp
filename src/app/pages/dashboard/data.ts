import { ChartType } from './dashboard.model';

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    let idx = 0;
    while (date.getMonth() === month && idx < 15) {
        const d = new Date(date);
        days.push(d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' }));
        date.setDate(date.getDate() + 1);
        idx += 1;
    }
    return days;
}

const now = new Date();
const labels = getDaysInMonth(now.getMonth(), now.getFullYear());
const revenueAreaChart: ChartType = {
    chart: {
        height: 282,
        type: 'area',
        toolbar: {
            show: false
        },
    },
    tooltip: {
        theme: 'dark',
        x: { show: false }
    },
    stroke: {
        curve: 'smooth',
        width: 4
    },
    series: [{
        name: 'Revenue',
        data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35]
    }],
    dataLabels: {
        enabled: false
    },
    zoom: {
        enabled: false
    },
    legend: {
        show: false
    },
    colors: ['#43d39e'],
    xaxis: {
        type: 'string',
        categories: labels,
        tooltip: {
            enabled: false
        },
        axisBorder: {
            show: false
        },
    },
    yaxis: {
        labels: {
            formatter(val) {
                return val + 'k';
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100]
        },
    },
};

const targetsBarChart: ChartType = {
    chart: {
        height: 282,
        type: 'bar',
        stacked: true,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '45%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Net Profit',
        data: [35, 44, 55, 57, 56, 61]
    }, {
        name: 'Revenue',
        data: [52, 76, 85, 101, 98, 87]
    }],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisBorder: {
            show: false
        },
    },
    legend: {
        show: false
    },
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2
        },
        borderColor: '#f3f4f7'
    },
    tooltip: {
        y: {
            formatter: (val: any) => {
                return '$ ' + val + ' thousands';
            }
        }
    },
    colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
};

const salesDonutChart: ChartType = {
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
            },
            expandOnClick: false
        }
    },
    chart: {
        height: 298,
        type: 'donut',
    },
    colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
    legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'left',
        itemMargin: {
            horizontal: 6,
            vertical: 3
        }
    },
    series: [34, 65, 45, 37],
    labels: ['Veg', 'Non-Veg', 'Refreshments', 'Menu'],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom'
            }
        }
    }],
    tooltip: {
        y: {
            formatter: (value) => {
                return '$ ' + value +'0' ;
            }
        },
    }
};

/*------------------------- Orders table Data ----------------------- */

const ordersData = [
    {
        id: '#98754',
        product: 'ASOS Ridley High',
        name: 'Otto B',
        price: '$79.49',
        status: 'Pending',
    },
    {
        id: '#98753',
        product: 'Marco Lightweight Shirt',
        name: 'Mark P',
        price: '$125.49',
        status: 'Delivered',
    },
    {
        id: '#98752',
        product: 'Half Sleeve Shirt',
        name: 'Dave B',
        price: '$35.49',
        status: 'Declined',
    },
    {
        id: '#98751',
        product: 'Lightweight Jacket',
        name: 'pro N',
        price: '$49.49',
        status: 'Delivered',
    },
    {
        id: '#98750',
        product: 'Marco Shoes',
        name: 'Rik N',
        price: '$69.49',
        status: 'Declined',
    },
];

export { revenueAreaChart, targetsBarChart, salesDonutChart, ordersData };
