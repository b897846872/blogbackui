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
  images_upload_url: 'postAcceptor.php',
  images_upload_base_path: '/some/basepath',
  images_upload_credentials: true
}
export default
{
  editorInit,
}
</script>
