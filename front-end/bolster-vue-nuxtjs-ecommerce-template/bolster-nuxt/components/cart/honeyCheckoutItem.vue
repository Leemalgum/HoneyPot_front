<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <form>
              <div class="cart-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">주문상품</th>
                    </tr>
                  </thead>
  
                  <tbody v-if="cart.length > 0">
                    <tr v-for="(cart, i) in cart" :key="i">
                      <td class="product-thumbnail">
                        <a href="#">
                          <img :src="cart.image" :alt="cart.name" />
                        </a>
                      </td>
  
                      <td class="product-name">
                        <nuxt-link :to="`/products-details/${cart.id}`">
                          {{ cart.name }}
                        </nuxt-link>
                        <ul>
                          <li>Color: <strong>Light Blue</strong></li>
                          <li>Size: <strong>XL</strong></li>
                          <li>Material: <strong>Cotton</strong></li>
                        </ul>
                      </td>
  
                      <td class="product-price">
                        <span class="unit-amount">${{ cart.price }}</span>
                      </td>
  
                      <td class="product-quantity">
                        <div class="input-counter">
                          <span @click="onDecrement(cart.id, cart.quantity)" class="minus-btn"><i
                              class="fas fa-minus"></i></span>
                          {{ cart.quantity }}
                          <span @click="onIncrement(cart.id)" class="plus-btn"><i class="fas fa-plus"></i></span>
                        </div>
                      </td>
  
                      <td class="product-subtotal">
                        <span class="subtotal-amount">${{ cart.price * cart.quantity }}</span>
  
                        <a href="javascript:void(0)" @click="removeItemFromCart(cart.id)" class="remove"><i
                            class="far fa-trash-alt"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
  
            </form>
          </div>
        </div>
      </div>
  
      <!-- Start Page Title Area -->
  
      <!-- End Page Title Area -->
  
      <!-- Start Checkout Area -->
      <div class="checkout-area ptb-60">
        <div class="container">
  
  
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="billing-details">
                  <h3 class="title">배송지</h3>
  
                  <div class="row">
                    <div class="col-lg-12 col-md-6">
                      <div class="form-group">
                        <label>받는사람 <span class="required">*</span></label>
                        <input type="text" id="fullName" v-model="personDetails.fullName" class="form-control" />
                      </div>
                    </div>
  
                    <div class="col-lg-6 col-md-3">
                      <div class="form-group">
                        <label>주소 <span class="required">*</span></label>
                        <!-- TODO::personDetails 에서 zipcode 추가 -->
                        <input type="text" id="zipcode" v-model="personDetails.address" class="form-control"
                          placeholder="우편번호" />
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-3">
                      <br><br>
                      <div class="find-address-button">
                        <button class="btn btn-primary">주소검색</button>
                      </div>
                    </div>
  
  
                    <div class="col-lg-12 col-md-6">
                      <div class="form-group">
                        <!-- <label>Town / City <span class="required">*</span></label> -->
                        <!-- <input
                            type="text"
                            id="city"
                            v-model="personDetails.city"
                            class="form-control"
                          /> -->
                        <input type="text" id="address" v-model="personDetails.address" class="form-control"
                          placeholder="기본주소" />
                      </div>
  
  
                      <div class="form-group">
                        <!-- TODO::address2 추가-->
                        <input type="text" id="address" v-model="personDetails.address" class="form-control"
                          placeholder="나머지 주소(선택 입력 가능)" />
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group">
                          <label>휴대전화 <span class="required">*</span></label>
                          <input type="text" id="phone" v-model="personDetails.phone" class="form-control phone-input" />
                        </div>
                      </div>
  
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group">
                          <label>이메일 <span class="required">*</span></label>
                          <input type="email" id="email" v-model="personDetails.email" class="form-control" />
                        </div>
                      </div>
                    </div>
  
                    
                  </div>
                </div>
  
                
  
                <!-- <div class="cart-buttons">
                  <div class="row">
                    <div class="col-lg-7 col-md-7">
                      <div class="continue-shopping-box">
                        <nuxt-link to="/products" class="btn btn-light">Continue Shopping</nuxt-link>
                      </div>
                    </div>
  
  
                  </div>
                </div> -->
              </div>
  
              <div class="col-lg-6 col-md-12">
                <div class="order-details">
                  <h3 class="title">결제정보</h3>
  
                  <div class="order-table table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">주문상품</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
  
                      <tbody>
                        <tr v-for="(cart, i) in cart" :key="i">
                          <td class="product-name">
                            <a href="#">{{ cart.name }}</a>
                          </td>
  
                          <td class="product-total">
                            <span class="subtotal-amount">${{ cart.price * cart.quantity }}</span>
                          </td>
                        </tr>
  
                        <tr>
                          <td class="order-subtotal">
                            <span>상품 가격</span>
                          </td>
  
                          <td class="order-subtotal-price">
                            <span class="order-subtotal-amount">${{ cartTotal }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="order-shipping">
                            <span>배송비</span>
                          </td>
  
                          <td class="shipping-price">
                            <span>2,500원</span>
                          </td>
                        </tr>
  
                        <tr>
                          <td class="order-inspection">
                            <span>검수비용</span>
                          </td>
  
                          <td class="insepction-fee">
                            <span>3,900원</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="total-price">
                            <span>최종 결제 금액</span>
                          </td>
  
                          <td class="product-subtotal">
                            <span class="subtotal-amount">${{ parseFloat(cartTotal + 10).toFixed(2) }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
  
                  <!-- <div class="payment-method">
                    <p>
                      <input type="radio" id="direct-bank-transfer" name="radio-group" checked />
                      <label for="direct-bank-transfer">Direct Bank Transfer</label>
  
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not
                      be shipped until the funds have cleared in our account.
                    </p>
                    <p>
                      <input type="radio" id="paypal" name="radio-group" />
                      <label for="paypal">PayPal</label>
                    </p>
                    <p>
                      <input type="radio" id="cash-on-delivery" name="radio-group" />
                      <label for="cash-on-delivery">Cash on Delivery</label>
                    </p>
                  </div> -->
  
                  <a href="javascript:void(0)" @click="add" class="btn btn-primary order-btn">결제 하기</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- End Checkout Area -->
    </div>
  </template>
  
  <script>
  import firebase from '../../plugins/firebase'
  export default {
    data() {
      return {
        personDetails: {
          fullName: 'John Doe',
          address: '',
          city: 'New York',
          email: 'john@gmail.com',
          phone: '01021228150',
          createdAt: new Date(),
        },
      }
    },
    computed: {
      cart() {
        return this.$store.getters.cart
      },
      cartTotal() {
        return this.$store.getters.totalAmount
      },
      cartTotal() {
        return this.$store.getters.totalAmount
      },
    },
    methods: {
      add() {
        const cartData = {
          details: this.personDetails,
          items: this.cart,
        }
        const db = firebase.firestore()
        const dbOrderRef = db.collection('orders')
        dbOrderRef.add(cartData)
        this.$toast.success(`Thanks for the order`, {
          icon: 'fas fa-cart-plus',
        })
        this.$store.dispatch('cartEmpty')
        this.$router.push('/')
      },
      removeItemFromCart(id) {
        this.$store.dispatch('deleteCart', id)
      },
      onIncrement(id) {
        this.$store.dispatch('updateCart', {
          id,
          unit: 1,
          cart: this.cart,
        })
      },
      onDecrement(id, quantity) {
        if (quantity > 1) {
          this.$store.dispatch('updateCart', {
            id,
            unit: -1,
            cart: this.cart,
          })
        } else {
          this.removeItemFromCart(id)
          this.$toast.warning('Item deleted!')
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .billing-details .find-address-button button {
    background-color: #FFB400;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    margin-top: -10px;
  }
  
  .billing-details .find-address-button button:hover {
    background-color: white;
    color:black;
    border: 1px solid black;
  }
  </style>