<template>
  <div class="items-center min-h-screen pb-2 flex-col flex bg-gray-600">
    <InputForm />
    <Nuxt />
  </div>
</template>

<script>
import InputForm from '../components/InputForm'
export default {
  components: { InputForm }
}
</script>
