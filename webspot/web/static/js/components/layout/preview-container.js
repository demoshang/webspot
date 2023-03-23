const {ref, computed, watch, onMounted} = Vue;
const {useStore} = Vuex;

export default {
  name: 'PreviewContainer',
  setup() {
    const store = useStore();

    const activeRequestId = computed(() => store.state.activeRequestId);

    // const activeRequestHtmlHighlighted = computed(() => convertToBase64(store.getters.activeRequestHtmlHighlighted));
    const activeRequestHtmlSrc = computed(() => `/api/requests/${activeRequestId.value}/html`);

    const isLoading = ref(false);

    const invokeLoading = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };

    watch(() => activeRequestId.value, invokeLoading);
    onMounted(invokeLoading);

    return {
      activeRequestHtmlSrc,
      isLoading,
    };
  },
  template: `<div class="preview-container">
  <el-skeleton v-if="isLoading" style="height: 100%; width: 100%; padding: 2%" :rows="25"/>
  <iframe v-else id="iframe" width="100%" height="100%" :src="activeRequestHtmlSrc"></iframe>
</div>`
};