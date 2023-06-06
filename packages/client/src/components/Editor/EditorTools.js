import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
// import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    shortcut: "CMD+SHIFT+H",
    config: {
      placeholder: "Title",
      levels: [1, 2, 3, 4],
      defaultLevel: 3,
    },
  },

  // image: {
  //   class: ImageTool,
  //   config: {
  //     uploader: {
  //       uploadByFile(file: File) {
  //         const form: UploadFileForm = { image: file };
  //         return editorService.uploadFile(form).then((res) => res.data);
  //       },
  //       // only work when url has extensions like .jpg
  //       uploadByUrl(url: string) {
  //         const form: UploadUrlForm = { url };
  //         return editorService.uploadFileByUrl(form);
  //       },
  //     },
  //   },
  // },
  list: {
    class: List,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "テキストを入力",
      captionPlaceholder: "キャプションを入力",
    },
  },
  delimiter: Delimiter,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  code: Code,
  paragraph: Paragraph
};
