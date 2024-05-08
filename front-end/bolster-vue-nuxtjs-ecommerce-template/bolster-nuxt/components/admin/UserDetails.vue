<template>
    <tr>
        <td>${{user.serialNumber}}</td>
        <td>{{user.id}}</td>
        <td>${{user.birthdate}}</td>
        <td>${{user.nickname}}</td>
        <td>${{address.roadAddress}}</td>
        <td>${{user.registrationDate}}</td>
        <td><span class="badge badge-primary">Received</span></td>
    </tr>
</template>

<script>
export default {
    props: ['user', 'address']
}
</script>
