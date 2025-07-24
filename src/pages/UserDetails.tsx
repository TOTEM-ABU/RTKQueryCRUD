import { useParams } from "react-router";
import { useGetUserDetailsQuery } from "../services";

const UserDetails = () => {
  const { userId } = useParams();

  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserDetailsQuery(userId ?? "");

  if (!userId) return <div className="container">Invalid user ID</div>;
  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error loading user data</div>;

  return (
    <div className="user-details-container">
      <h2 className="user-title">User Details</h2>
      <ul className="user-info-list">
        <li>
          <strong>Name:</strong> {userData?.name}
        </li>
        <li>
          <strong>Username:</strong> {userData?.username}
        </li>
        <li>
          <strong>Email:</strong> {userData?.email}
        </li>
        <li>
          <strong>Street:</strong> {userData?.address.street}
        </li>
        <li>
          <strong>Suite:</strong> {userData?.address.suite}
        </li>
        <li>
          <strong>City:</strong> {userData?.address.city}
        </li>
        <li>
          <strong>Zipcode:</strong> {userData?.address.zipcode}
        </li>
        <li>
          <strong>Lat:</strong> {userData?.address.geo.lat}
        </li>
        <li>
          <strong>Lng:</strong> {userData?.address.geo.lng}
        </li>
        <li>
          <strong>Phone:</strong> {userData?.phone}
        </li>
        <li>
          <strong>Website:</strong> {userData?.website}
        </li>
        <li>
          <strong>Company name:</strong> {userData?.company.name}
        </li>
        <li>
          <strong>Catchphrase:</strong> {userData?.company.catchPhrase}
        </li>
        <li>
          <strong>BS:</strong> {userData?.company.bs}
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
