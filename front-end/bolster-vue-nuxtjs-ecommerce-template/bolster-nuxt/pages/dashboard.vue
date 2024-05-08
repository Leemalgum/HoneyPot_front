<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">Dashboard</h1>
                        <div class="btn-toolbar">
                            <div class="btn-group mr-2">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                >공유
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary ml-2"
                                >엑셀로 내보내기
                                </button>
                            </div>
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary dropdown-toggle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-calendar"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                이번 주
                            </button>
                        </div>
                    </div>
                    <div class="dashboard-content">
                        <!-- 사이트 통계 -->
                        <div class="card">
                            <div class="card-header">
                                사이트 통계 (월 단위)
                            </div>
                            <div class="card-body">
                                <div class="stats-grid">
                                    <div class="stat-item">
                                        <h4>총 거래량</h4>
                                        <p>{{ statistics.totalTransactions }}</p>
                                    </div>
                                    <div class="stat-item">
                                        <h4>총 사용자 수</h4>
                                        <p>{{ statistics.totalUsers }}</p>
                                    </div>
                                    <div class="stat-item">
                                        <h4>활성 상품 목록</h4>
                                        <p>{{ statistics.activeListings }}</p>
                                    </div>
                                    <div class="stat-item">
                                        <h4>총 수익</h4>
                                        <p>${{ statistics.totalRevenue.toFixed(2) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 최근 거래 현황 -->
                        <div class="card">
                            <div class="card-header">
                                최근 거래 현황
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>경매ID</th>
                                            <th>주문번호</th>
                                            <th>상품아이디</th>
                                            <th>결제상태</th>
                                            <th>경매결과</th>
                                            <th>종료시간</th>
                                            <th>상태변경시간</th>
                                            <th>거래완료날짜</th>
                                            <th>로그생성시간</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="transaction in recentTransactions" :key="transaction.orderNumber">
                                            <td>{{ transaction.auctionId }}</td>
                                            <td>{{ transaction.orderNumber }}</td>
                                            <td>{{ transaction.productId }}</td>
                                            <td>{{ transaction.paymentStatus }}</td>
                                            <td>{{ transaction.auctionResult }}</td>
                                            <td>{{ transaction.endTime }}</td>
                                            <td>{{ transaction.statusChangeTime }}</td>
                                            <td>{{ transaction.transactionCompletionDate }}</td>
                                            <td>{{ transaction.logCreationTime }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <transaction-list :transactions="recentTransactions"></transaction-list>
                            </div>
                        </div>
                        <!-- 상품 분석 및 통계 -->
                        <div class="card">
                            <div class="card-header">
                                상품 분석 및 통계
                            </div>
                            <div class="card-body">
                                <!-- 막대 그래프: 판매량 및 매출 -->
                                <div class="chart-container" style="margin-bottom: 20px;">
                                    <canvas ref="salesRevenueChart" v-if="chartData" width="400" height="400"></canvas>
                                </div>
                                <!-- 원형 그래프: 인기 상품 -->
                                <div class="chart-container" style="margin-bottom: 20px;">
                                    <canvas ref="topProductsChart" v-if="chartData" width="400" height="400"></canvas>
                                </div>
                                <!-- 선 그래프: 시간에 따른 구매행태 -->
                                <div class="chart-container">
                                    <canvas ref="customerPurchaseTrendChart" v-if="chartData" width="400"
                                            height="400"></canvas>
                                </div>
                                <product-stats :stats="productStatistics"></product-stats>
                            </div>
                        </div>

                        <!-- 사용자 관리 -->
                        <div class="card">
                            <div class="card-header">
                                사용자 관리
                            </div>
                            <div class="card-body">
                                <user-summary :users="usersSummary"></user-summary>
                            </div>
                        </div>

                        <!-- 리뷰 및 평가 관리 -->
                        <div class="card">
                            <div class="card-header">
                                리뷰 및 평가 관리
                            </div>
                            <div class="card-body">
                                <review-list :reviews="reviewsData"></review-list>
                            </div>
                        </div>

                        <!-- 고객 지원 및 문의 -->
                        <div class="card">
                            <div class="card-header">
                                고객 지원 및 문의
                            </div>
                            <div class="card-body">
                                <support-queries :queries="supportQueries"></support-queries>
                            </div>
                        </div>

                        <!-- 보안 및 로그 -->
                        <div class="card">
                            <div class="card-header">
                                보안 및 로그
                            </div>
                            <div class="card-body">
                                <security-logs :logs="securityLogs"></security-logs>
                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    </div>
</template>

<script>
import {Bar, Doughnut, Line} from 'vue-chartjs'

import Loader from '../components/common/Loader'
import OrderPerson from '../components/admin/OrderPerson'
import Sidebar from '../components/admin/Sidebar'
import firebase from '../plugins/firebase'

export default {
    layout: 'admin',
    components: {
        OrderPerson,
        Loader,
        Sidebar,
        SalesRevenueChart: {
            extends: Bar,
            mounted() {
                this.renderChart({
                    labels: ['1월', '2월', '3월', '4월'],
                    datasets: [
                        {
                            label: '판매량',
                            backgroundColor: '#42A5F5',
                            data: [40, 60, 45, 70]
                        },
                        {
                            label: '매출',
                            backgroundColor: '#FFA726',
                            data: [20000, 30000, 26000, 38000]
                        }
                    ]
                }, {responsive: true, maintainAspectRatio: false});
            }
        },
        TopProductsChart: {
            extends: Doughnut,
            mounted() {
                this.renderChart({
                    labels: ['상품 A', '상품 B', '상품 C'],
                    datasets: [
                        {
                            data: [10, 20, 30],
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                        }
                    ]
                }, {responsive: true, maintainAspectRatio: false});
            }
        },
        CustomerPurchaseTrendChart: {
            extends: Line,
            mounted() {
                this.renderChart({
                    labels: ['1월', '2월', '3월', '4월'],
                    datasets: [
                        {
                            label: '고객 구매행태',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            data: [50, 25, 50, 75],
                            fill: true
                        }
                    ]
                }, {responsive: true, maintainAspectRatio: false});
            }
        },
    },
    data() {
        return {
            chartData: null,
            loading: true,
            ordersData: [],
            recentTransactions: [],
            productStatistics: {},
            usersSummary: {},
            reviewsData: [],
            supportQueries: [],
            securityLogs: [],
            statistics: {
                totalTransactions: 0,
                totalUsers: 0,
                activeListings: 0,
                totalRevenue: 0.00
            },
        }
    },
    mounted() {
        const db = firebase.firestore()
        const dbOrderRef = db.collection('orders')
        let orderArray = []
        dbOrderRef
            .get()
            .then(res => {
                res.forEach(doc => {
                    let orderObj = doc.data()
                    orderObj.id = doc.id
                    orderArray.push(orderObj)
                })
                this.ordersData = orderArray
                this.loading = false
            })
            .catch(err => {
                console.log('error', err)
            })
        // API 호출 또는 Firebase 등을 통해 데이터 로드
        this.loadDashboardData();
        this.loadRecentTransactions();
        console.log(this.$refs.salesRevenueChart); // 차트 컴포넌트 상태 확인
        this.loadSiteStatistics().then(() => {
            this.$nextTick(() => {
                if (this.$refs.salesRevenueChart) {
                    this.$refs.salesRevenueChart.renderChart({
                        labels: ['1월', '2월', '3월', '4월'],
                        datasets: [
                            {
                                label: '판매량',
                                backgroundColor: '#42A5F5',
                                data: [40, 60, 45, 70]
                            },
                            {
                                label: '매출',
                                backgroundColor: '#FFA726',
                                data: [20000, 30000, 26000, 38000]
                            }
                        ]
                    }, {responsive: true, maintainAspectRatio: false});
                } else {
                    console.error('Chart component is not ready.');
                }
            });
        });
    },
    methods:
        {
            chartData() {
                return {
                    labels: ['1월', '2월', '3월', '4월'],
                    datasets: [
                        {
                            label: '판매량',
                            backgroundColor: '#42A5F5',
                            data: [40, 60, 45, 70]
                        },
                        {
                            label: '매출',
                            backgroundColor: '#FFA726',
                            data: [20000, 30000, 26000, 38000]
                        }
                    ]
                };
            }
            ,
            topProductsData() {
                return {
                    labels: ['상품 A', '상품 B', '상품 C'],
                    datasets: [{
                        data: [10, 20, 30],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                };
            }
            ,
            purchaseTrendData() {
                return {
                    labels: ['1월', '2월', '3월', '4월'],
                    datasets: [{
                        label: '고객 구매행태',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: [50, 25, 50, 75],
                        fill: true
                    }]
                };
            }
            ,
            loadDashboardData() {
                // 데이터 로딩 로직 구현
            }
            ,
            loadRecentTransactions() {
                // 최근 거래 데이터 로드 로직
            }
            ,
            loadSiteStatistics() {
                // 사이트 통계 데이터 로드
                // 데이터 로드가 완료된 후 promise를 반환
                return new Promise(resolve => {
                    setTimeout(() => { // 예제용 timeout
                        this.statistics.totalTransactions = 1234;
                        this.statistics.totalUsers = 5678;
                        this.statistics.activeListings = 234;
                        this.statistics.totalRevenue = 98765.43;
                        resolve();
                    }, 1000);
                });
            }
            ,
        }
}
</script>

<style lang="scss">
.preloader-loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.66);
    z-index: 999;

    .loader {
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        left: 50%;
        color: #fff;
    }
}

.recent-orders-box {
    margin-top: 30px;

    .title {
        position: relative;

        h3 {
            margin-bottom: 15px;
            font: {
                size: 20px;
                weight: 600;
            }
        }

        ul {
            padding-left: 0;
            margin-bottom: 0;
            list-style-type: none;
            position: absolute;
            right: 0;
            top: -10px;

            li {
                display: inline-block;
                margin-left: 5px;

                a,
                button {
                    display: block;
                    background-color: #f2f2f2;
                    color: #000000;
                    padding: 5px 15px;
                    border: none;
                    transition: 0.5s;

                    &:hover {
                        background-color: #000000;
                        color: #fff;
                    }
                }

                &:nth-child(2) {
                    a,
                    button {
                        &:hover {
                            background-color: red;
                            color: #fff;
                        }
                    }
                }

                &:nth-child(3) {
                    a,
                    button {
                        &:hover {
                            background-color: green;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    table {
        margin-bottom: 0;

        thead {
            th {
                text-align: left;
                white-space: nowrap;
                padding: 15px 15px 15px 0;
                border-bottom: 1px solid #f6f6f7;
                border-color: #f6f6f7;
                font-size: 15px;
            }
        }

        tbody {
            tr {
                td {
                    padding: 15px;
                    vertical-align: middle;
                    white-space: nowrap;
                    border-bottom: 1px solid #f6f6f7;
                    border-top: none;
                    font-size: 14.4px;

                    &:first-child {
                        padding-left: 0;
                    }

                    &.name {
                        font-weight: 700;
                    }

                    img {
                        width: 50px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
        position: -webkit-sticky;
        position: sticky;
    }
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}

.sidebar .nav-link.active {
    color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*
 * Content
 */

[role='main'] {
    padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
    [role='main'] {
        padding-top: 48px; /* Space for fixed navbar */
    }
}

.dashboard-content > div {
    margin-bottom: 20px;
}

.table-responsive {
    margin-top: 20px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.stat-item {
    text-align: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
}

.chart-container {
    position: relative;
    height: 40vh;
}
</style>
