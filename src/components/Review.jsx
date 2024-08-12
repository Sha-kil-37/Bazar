import React, { useEffect, useState } from "react";
import DateConverter from "../utils/DateConverter";
import reviewer from "../images/reviewer.png";
import { BsFillStarFill } from "react-icons/bs";

//
const Review = (props) => {
  //
  const [reviewerName, setReviewerName] = useState("");
  const [date, setDate] = useState("");
  const [reviewerComment, setReviewerComment] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  //
  useEffect(() => {
    setReviewerName(props.data.reviewerName);
    setReviewerEmail(props.data.reviewerEmail);
    setDate(props.data.date);
    setReviewerComment(props.data.comment);
  }, [props]);

  //
  return (
    <div className="rounded-lg px-3 py-3">
      <div className="flex justify-between">
        <div>
          <ul className="flex gap-x-2">
            {[0, 1, 2, 3, 4].map((item, i) => {
              return <BsFillStarFill className="text-black" key={i} />;
            })}
          </ul>
        </div>
        <div>
          <DateConverter data={date} />
        </div>
      </div>
      <p className="text-black">{reviewerComment}</p>
      <p className="text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At totam
        impedit, sequi iure veniam modi quibusdam, eveniet eum provident
        perspiciatis voluptas nihil sunt recusandae iste, blanditiis perferendis
        tempore magnam vitae sapiente nostrum laudantium officiis reprehenderit
        atque? Quo corrupti repudiandae praesentium, dolores quae neque cum,
        modi quas explicabo soluta, animi fugiat?
      </p>
      <div className="flex gap-x-2 items-center mt-3">
        <div className="max-h-20 max-w-20 rounded-full overflow-hidden object-cover">
          <img className="h-full w-full" src={reviewer} alt={reviewer} />
        </div>
        <div>
          <h4 className="font-medium text-black">{reviewerName}</h4>
          <h4 className="font-medium text-black">{reviewerEmail}</h4>
        </div>
      </div>
    </div>
  );
};

export default Review;
