<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const imageFiles = ref([]); // 이미지 파일을 저장할 배열을 ref를 사용해 정의

const editorConfig = {
  selector: "sample",
  toolbar_mode: 'sliding',
  plugins: 'paste image imagetools',
  toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
  paste_data_images: true,
  file_picker_types: 'image',
  tinycomments_mode: 'embedded',
  tinycomments_author: 'Author name',
  mergetags_list: [
    { value: 'First.Name', title: 'First Name' },
    { value: 'Email', title: 'Email' },
  ],
  images_upload_handler(blobInfo, success, failure) {
    const file = new File([blobInfo.blob()], blobInfo.filename());
    const fileName = blobInfo.filename();

    if (fileName.includes("blobid")) {
      success(URL.createObjectURL(file));
    } else {
      imageFiles.value.push(file);
      success(URL.createObjectURL(file)); // Blob 객체의 임시 URL을 생성해 이미지 미리보기 적용
    }
  },
  content_style: "img { max-width: 100%; height: auto; }", // 모든 이미지가 에디터 너비에 맞게 조정
  height: 500, // 에디터의 높이 설정
  width: "100%", // 에디터의 너비를 100%로 설정
  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
}
</script>

<template>
  <client-only>
    <main id="sample">
      <Editor
        api-key="bxo41dc5dxyisscks24w4z5z8j8rnp1ox7245kjjvz6kq2ni"
        :init="editorConfig"
        initial-value="꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다."
      />
    </main>
  </client-only>
</template>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%; 
    margin: 0 auto; 
  }
}
</style>

