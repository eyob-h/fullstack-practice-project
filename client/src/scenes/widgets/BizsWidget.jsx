import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBizs } from "state";
import BizWidget from "./BizWidget";

const BizsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const bizs = useSelector((state) => state.bizs);
  const token = useSelector((state) => state.token);

  const getBizs = async () => {
    const response = await fetch("http://localhost:3001/bizs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setBizs({ bizs: data }));
  };

  const getUserBizs = async () => { //businesses created by user
    const response = await fetch(
      `http://localhost:3001/bizs/${userId}/bizs`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setBizs({ bizs: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserBizs();
    } else {
      getBizs();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {bizs.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <BizWidget
            key={_id}
            bizId={_id}
            bizUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default BizsWidget;
