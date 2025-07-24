import { useState } from "react";
import { Link } from "react-router";
import { Button, Modal, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../services";
import "../index.css";
import toast from "react-hot-toast";
import type { UserTypes } from "../services/api/users.type";

interface UserFormData {
  name: string;
  username: string;
  email: string;
  street: string;
  suite?: string;
  city: string;
  zipcode?: string;
  lat?: string;
  lng?: string;
  phone: string;
  website?: string;
  companyName?: string;
  catchPhrase?: string;
  bs?: string;
}

const Users = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [deleteUser, { isLoading: isDeleting, originalArgs }] =
    useDeleteUserMutation();
  const [editUser, setEditUser] = useState<UserTypes | null>(null);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      phone: "",
      website: "",
      companyName: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const showModal = (user?: UserTypes) => {
    if (user) {
      setEditUser(user);
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
        phone: user.phone,
        website: user.website,
        companyName: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      });
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditUser(null);
    reset();
  };

  const onSubmit = async (values: UserFormData) => {
    const userPayload: UserTypes = {
      id: editUser ? editUser.id : Date.now(),
      name: values.name,
      username: values.username,
      email: values.email,
      address: {
        street: values.street,
        suite: values.suite || "",
        city: values.city,
        zipcode: values.zipcode || "",
        geo: {
          lat: values.lat || "",
          lng: values.lng || "",
        },
      },
      phone: values.phone,
      website: values.website || "",
      company: {
        name: values.companyName || "",
        catchPhrase: values.catchPhrase || "",
        bs: values.bs || "",
      },
    };

    try {
      if (editUser) {
        await updateUser(userPayload).unwrap();
        toast.success("User updated successfully!");
      } else {
        await createUser(userPayload).unwrap();
        toast.success("User created successfully!");
      }

      handleCancel();
    } catch {
      toast.error("Failed to submit form");
    }
  };

  if (error) return <div className="container">Error</div>;
  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>

      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter name"
                  status={errors.name ? "error" : ""}
                />
              )}
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              Username <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter username"
                  status={errors.username ? "error" : ""}
                />
              )}
            />
            {errors.username && (
              <span style={{ color: "red" }}>{errors.username.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter email"
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              Street <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="street"
              control={control}
              rules={{ required: "Street is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter street"
                  status={errors.street ? "error" : ""}
                />
              )}
            />
            {errors.street && (
              <span style={{ color: "red" }}>{errors.street.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Suite</label>
            <Controller
              name="suite"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter suite" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              City <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter city"
                  status={errors.city ? "error" : ""}
                />
              )}
            />
            {errors.city && (
              <span style={{ color: "red" }}>{errors.city.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Zipcode</label>
            <Controller
              name="zipcode"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter zipcode" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Latitude</label>
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter latitude" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Longitude</label>
            <Controller
              name="lng"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter longitude" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              Phone <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter phone number"
                  status={errors.phone ? "error" : ""}
                />
              )}
            />
            {errors.phone && (
              <span style={{ color: "red" }}>{errors.phone.message}</span>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Website</label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter website" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Company Name</label>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter company name" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Company Catch Phrase</label>
            <Controller
              name="catchPhrase"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter catch phrase" />
              )}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Company BS</label>
            <Controller
              name="bs"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter company BS" />
              )}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {editUser
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "Creating..."
              : "Submit"}
          </Button>
        </form>
      </Modal>

      {data?.map((user) => (
        <div key={user.id} className="user-card">
          <Link to={`/${user.id}`}>
            <h3>{user.name}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
          </Link>

          <button
            className="delete-button"
            onClick={() => {
              deleteUser(user.id)
                .unwrap()
                .then(() => toast.success("User deleted"))
                .catch(() => toast.error("Failed to delete user"));
            }}
            disabled={isDeleting && originalArgs === user.id}
          >
            {isDeleting && originalArgs === user.id ? "Deleting..." : "Delete"}
          </button>
          <button
            className="edit-button"
            onClick={() => showModal(user)}
            style={{ marginRight: 8 }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
