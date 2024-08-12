"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Dynamically import the TinyMCE editor
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false, // Disable server-side rendering
  }
);

const AdminPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [plainTextContent, setPlainTextContent] = useState("");
  const [slugData, setSlugData] = useState("");
  const [image, setImage] = useState(null);
  const [availableTags] = useState([
    "Artifical Intelligence",
    "Brand Marketing",
    "Blogging",
    "Content Marketing",
    "Digital Marketing",
    "Ecommerce",
    "Email Marketing",
    "Facebook Marketing",
    "Frameworks",
    "Fullstack JS Development",
    "Google Remarketing",
    "Infographic",
    "Hubspot",
    "InfusionSoft",
    "Internet Marketing",
    "Ios Development",
    "Iphone App Development",
    "Java Development",
    "Joomla",
    "Linkedin Marketing",
    "Logo Design",
    "Magento",
    "Mobile App Development",
    "Online Reputation Management",
    "ORM",
    "Paid Marketing",
    "PHP",
    "SEO",
    "Shopify",
    "Social Media Marketing",
    "Titanium Development",
    "Web Application Development",
    "Web Design",
    "Web Development",
    "Wordpress",
  ]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleEditorChange = (content) => {
    setPlainTextContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", plainTextContent);
      formData.append("slug", slugData);
      formData.append("tags", JSON.stringify(selectedTags));
      if (image) {
        formData.append("image", base64Image);
      }

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            content: plainTextContent,
            slug: slugData,
            tags: selectedTags,
            image: base64Image,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value && !selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    router.push("/login");
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            value={slugData}
            onChange={(e) => setSlugData(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <select onChange={handleSelectChange} value="">
            <option value="" disabled>
              Choose a tag
            </option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="tags-input">
            {selectedTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button
                  type="button"
                  className="remove-tag"
                  onClick={() => handleTagRemove(tag)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <Editor
            apiKey="aedyxvizubo6m2pq3oxpqsh1gyh3o14dvcqvoovs6jotsu8e"
            initialValue=""
            init={{
              height: 800,

              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "custom alignright alignjustify | bullist numlist outdent indent  | link image media code| " +
                "removeformat | help",
              image_title: true,
              automatic_uploads: false,
              file_picker_types: " image ",
              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.addEventListener("change", (e) => {
                  const file = e.target.files[0];

                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                      */
                    const id = "blobid" + new Date().getTime();
                    const blobCache =
                      tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = reader.result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  });
                  reader.readAsDataURL(file);
                });

                input.click();
              },
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
