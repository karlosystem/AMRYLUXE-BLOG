import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from '@/components/Editor'

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";


const AddBlog = () => {

  const navigate = useNavigate();
  //el componente viaja a tu estado global de Redux para extraer el ID del usuario que inició sesión. Así sabrá quién es el autor del blog automáticamente. 
  const user = useSelector((state) => state.user) 

  const { data: categoryData } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });


  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();

 
  const formSchema = z.object({
    category: z.string().min(1, "Seleccione una categoría"),
    title: z.string().min(3, "Mínimo 3 caracteres."),
    slug: z.string().min(3, "Mínimo 3 caracteres."),
    blogContent: z.string().min(10, "El contenido es demasiado corto."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue('blogContent', data)
    }

 
  const blogTitle = form.watch("title");

  useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle]) 

  // 3. Función para enviar los datos al Backend
  async function onSubmit(values) {

    try {
      const newValues = { ...values, author: user.user._id }
      //const newValues = { ...values, author: user?.currentUser?._id || user?.user?._id }

      if (!file) {
        return showToast("error", "Por favor selecciona una imagen.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));
      
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
      })
      const data = await response.json()
      if (!response.ok) {
          return showToast('error', data.message)
      }
      form.reset()
      setFile()
      setPreview()
      navigate(RouteBlog)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const handleFileSelection = (files) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="py-10">
      {/* Ancho reducido y centrado */}
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary">Crear Nuevo Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryData?.category?.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Blog</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Las mejores carteras de cuero 2026" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="url-del-blog" {...field} readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Imagen Destacada (800px de ancho - 600px de alto)</label>
                <Dropzone onDrop={handleFileSelection} accept={{"image/*": []}} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="flex flex-col justify-center items-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className="h-full object-contain" />
                      ) : (
                        <p className="text-sm text-gray-500 text-center">Arrastra una imagen o haz clic aquí</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem> 
                    <FormLabel>Contenido del Blog</FormLabel>
                    <FormControl>
                      {/* Pasamos onChange y data al Editor */}
                      <div className="[&_.ck-editor__editable_inline]:min-h-[350px]">
                      <Editor 
                        props={{ 
                          initialData: field.value, 
                          onChange: (event, editor) => field.onChange(editor.getData()) 
                        }} 
                      />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando..." : "Publicar Blog"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;