<script>
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
const editorInit = {
  language_url: '/static/tinymce/zh_CN.js',
  language: 'zh_CN',
  skin_url: '/static/tinymce/skins/lightgray',
  height: 300,
  plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
  toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
  branding: false,
  selector: 'textarea',  // change this value according to your html
  images_upload_url: '/blog/tabArticle/uploadImage',
  images_upload_base_path: '/some/basepath',
  images_upload_credentials: true,
  images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', '/blog/tabArticle/uploadImage');
    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
      failure('HTTP Error: ' + xhr.status);
      return;
      }
      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
      // failure('Invalid JSON: ' + xhr.responseText);
      console.log(json.data);
      success(json.data);
      return;
      }
    };
    formData = new FormData();
    formData.append('file', blobInfo.blob());
    xhr.send(formData);
  }
}
export default
{
  editorInit,
}
</script>
