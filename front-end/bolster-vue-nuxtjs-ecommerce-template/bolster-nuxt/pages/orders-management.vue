<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">주문 관리</h1>
                        <div class="btn-toolbar">
                            <div class="search-bar">
                                <div class="b-radio-group">
                                    <input type="radio" id="user-ip" name="radio-option" class="radio-option"
                                           value="user-ip">
                                    <label for="user-ip">아이피</label>

                                    <input type="radio" id="user-id" name="radio-option" class="radio-option"
                                           value="user-id">
                                    <label for="user-id">회원 아이디</label>
                                </div>
                                <input type="text" placeholder="" class="search-input">
                            </div>
                            <div class="btn-group mr-2">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                >Share
                                </button>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary ml-2 dropdown-toggle" type="button"
                                            id="userActivityDropdown" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        전체
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="userActivityDropdown">
                                        <a class="dropdown-item" href="#">전체</a>
                                        <a class="dropdown-item" href="#">로그인 시도</a>
                                        <a class="dropdown-item" href="#">로그아웃</a>
                                        <!-- 여기에 다른 사용자 활동 항목 추가 -->
                                    </div>
                                </div>

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
                                기간 설정
                            </button>
                        </div>
                    </div>

                    <Loader v-if="loading"/>
                    <div v-if="ordersData.length > 0">
                        <OrderPerson v-for="(data, i) in ordersData" :key="i" :data="data"/>
                    </div>
                    <div v-else>
                        <h3>
                            <i>There are no orders right now!!</i>
                        </h3>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/common/Loader'
import OrderPerson from '../components/admin/OrderPerson'
import Sidebar from '../components/admin/Sidebar'
import firebase from '../plugins/firebase'

export default {
    layout: 'admin',
    components: {
        OrderPerson,
        Loader,
        Sidebar
    },
    data() {
        return {
            loading: true,
            ordersData: []
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
    }
}
</script>

<style lang="scss">
.search-bar {
    display: flex;
    align-items: center;
}

.search-input {
    display: flex;
    margin-right: 10px;
}

.radio-option {
    margin-right: 10px;
}

.b-radio-group {
    display: flex;
    align-items: center;
    margin-right: 10px; /* 라디오 버튼과 입력란 사이의 간격 조절 */
}

.b-radio-group input[type="radio"] {
    margin-right: 5px; /* 라디오 버튼 간의 간격 조절 */
    vertical-align: middle; /* 수직 정렬을 위해 추가 */
}

.b-radio-group label {
    vertical-align: middle; /* 수직 정렬을 위해 추가 */
}

.search-input {
    flex: 1; /* 입력란이 가능한 최대 공간을 차지하도록 함 */
}

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
</style>
