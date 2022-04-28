import bg5 from "../../assets/img/bg5.jpg";
import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import axios from "axios";
import { getUser } from "../../fetchdata/registerFetcher";
import { motion } from "framer-motion";
import { Image } from "semantic-ui-react";
import Oops from "../../search/openModal";
import {
  Form,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { Option } from "antd/lib/mentions";

const Details = ({ register }) => {
  const { TextArea } = Input;
  const router = useRouter();
  const [session, loading] = useSession();
  const url = "https://api.cloudinary.com/v1_1/blytetech/image/upload";
  const preset = "dufgjx3z";
  const [image, setImage] = useState("");
  const [imagee, setImagee] = useState("");

  const { id } = router.query;
  const reg = register?.email;

  const [form, setForm] = useState({
    userId: id,
    description: "",
    phonenumber: 0,
    age: 0,
    profilePicture: "",
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    var fd = new FormData();
    fd.append("upload_preset", preset);
    fd.append("file", imagee);
    const config2 = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const res = await axios.post(url, fd, config2);

    await setForm((form.profilePicture = res.data.secure_url));
    const imageUrl = await res.data.secure_url;

    await setForm({ ...form, profilePicture: imageUrl });

    setForm((form.userId = id));
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    console.log(form);

    try {
      const response = await axios.put(`/api/register/${id}`, form, config);
      if (!session) {
        router.push("/logins/login");
      }
      if (session) {
        router.push("/logins/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!reg) {
    return (
      <div
        className="ui segment"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <main>
          <Oops />
        </main>
      </div>
    );
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+234</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div
      className="bg-cover bg-center ..."
      style={{ height: "100vh", backgroundImage: `url(${bg5})` }}
    >
      <motion.div
        className="container mx-auto px-4 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex content-center items-center justify-center h-full">
          <link
            href="https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css"
            rel="stylesheet"
          />

          <div className="w-full lg:w-4/12 px-4">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Form name="register">
                <div className="flex mb-4 w-full justify-center text-center align-middle">
                  <div className="flex flex-col space-y-4 align-middle text-center">
                    <Image
                      className="object-contain rounded-full max-h-52"
                      src={
                        image
                          ? image
                          : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                      }
                      bordered
                      size="small"
                    />

                    <label className="w-36 ml-3 flex flex-col items-center px-4 bg-gray-600 rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white text-black ease-linear transition-all duration-150">
                      <i className="fas fa-cloud-upload-alt fa-3x" />
                      <span className="mt-2 text-base leading-normal">
                        Select a profile pic
                      </span>
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => {
                          setImagee(event.target.files[0]);
                          setImage(URL.createObjectURL(event.target.files[0]));
                        }}
                        className="invisible"
                      />
                    </label>
                  </div>
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    style={{ color: "#ffff" }}
                  >
                    Enter your description/bio
                  </label>

                  <TextArea
                    className=" placeholder-black rounded-full text-green-500 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    showCount
                    allowClear={true}
                    maxLength={100}
                    style={{ width: "100%" }}
                    value={form.description}
                    onChange={handleChange}
                    name="description"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    style={{ color: "#ffff" }}
                  >
                    enter your Phone number
                  </label>
                  <Input
                    type="number"
                    addonBefore={prefixSelector}
                    className="rounded-full "
                    placeholder="Phone number"
                    size="large"
                    name="phonenumber"
                    onChange={handleChange}
                    maxLength={11}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    style={{ color: "#ffff" }}
                  >
                    enter your Age
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-black-300 rounded-full text-black-600 bg-white text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Age"
                    name="age"
                    maxLength={2}
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center mt-6">
                  <motion.button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{
                      scale: 1.0,
                      textShadow: "0px 0px 8px rgb(255,255,255)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Submit
                  </motion.button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3000/api/register/${params.id}`);
  const register = await res.json();

  // Pass post data to the page via props
  return { props: { register } };
}

export default Details;
