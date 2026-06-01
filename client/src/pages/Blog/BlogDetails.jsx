import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { deleteData } from '@/helpers/handleDelete'
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "../../helpers/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData],
  );

  const handleDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`,
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted.");
    } else {
      showToast("error", "Data not deleted.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Agregar Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Autor</TableHead>
                <TableHead>Imagen</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>
                      {blog?.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog?.title}
                          className="w-16 h-11 object-cover rounded-md border shadow-sm hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-16 h-11 bg-muted flex items-center justify-center rounded-md text-[10px] text-muted-foreground border border-dashed">
                          Sin foto
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" className="text-center py-4">
                    Data not found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
