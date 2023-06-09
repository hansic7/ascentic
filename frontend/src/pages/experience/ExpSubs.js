import styled from "styled-components";
import ExpGuide from "../../components/ExpSubs/ExpGuide";
import { useState } from "react";
import DeliveryInfo from "../../components/order/DeliveryInfo";
import Payment from "../../components/order/Payment";
import SubsPayInfo from "../../components/ExpSubs/SubsPayInfo";
import expSubsBackground from "../../assets/expMain/expmain_content3.webp";
import { getCookie } from "../../utils/Cookies";
import { useEffect } from "react";
import { requestTasteRes } from "../../api/SubsMemberApi";
import Loading from "../../components/common/Loading";
import logow from "../../assets/ascentic_logo_w.svg";

const ExpSubs = () => {
  const accessToken = getCookie("accessToken");
  const [loading, setLoading] = useState(false);

  const [userTasteRes, setTasteRes] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await requestTasteRes(accessToken); // api 함수 호출
      console.log(result);
      if (result === undefined || result.data === undefined) {
        setTasteRes("none");
      } else {
        setTasteRes(result.firstPlace); // 결과를 state에 저장
      }
      setLoading(false);
    };

    fetchData();
    console.log(userTasteRes);
  }, []);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  // 모달창 띄우기
  const openModal = () => {
    setModalPage(1);
    setShowOrderModal(true);
  };

  // 모달창 닫기
  const closeModal = () => {
    setShowOrderModal(false);
  };

  // 이전 페이지
  const beforePage = () => {
    setModalPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1));
    console.log(modalPage);
  };

  // 다음 페이지
  const nextPage = () => {
    setModalPage((prevPage) => (prevPage >= 3 ? 3 : prevPage + 1));
    console.log(modalPage);
  };

  // 페이지 번호에 따른 컴포넌트 render
  const currentPage = () => {
    if (modalPage === 1) {
      return (
        <>
          <DeliveryInfo></DeliveryInfo>
          <button className="next_page_btn" onClick={() => nextPage()}>
            다음
          </button>
        </>
      );
    } else if (modalPage === 2) {
      return (
        <>
          <Payment></Payment>
          <button className="before_page_btn" onClick={() => beforePage()}>
            이전
          </button>
          <button className="next_page_btn" onClick={() => nextPage()}>
            다음
          </button>
        </>
      );
    } else if (modalPage === 3) {
      return (
        <>
          <SubsPayInfo userTasteRes={userTasteRes}></SubsPayInfo>
          <button className="before_page_btn" onClick={() => beforePage()}>
            이전
          </button>
        </>
      );
    }
  };

  if (loading) {
    return <Loading />;
  } else if (userTasteRes === "") {
    return <Loading />;
  }
  return (
    <ExpSubsBody>
      <ExpSubsIntro>
        <div>특별한 당신을 위해</div>
        <div>
          <img src={logow} alt="ascentic_logo_white" />이 준비한
        </div>
        <div>체험 패키지 구독 서비스</div>
      </ExpSubsIntro>
      <GuideLocation>
        <ExpGuide
          showModal={() => openModal()}
          userTasteRes={userTasteRes}
        ></ExpGuide>
      </GuideLocation>
      {showOrderModal && (
        <>
          <ModalBackground onClick={closeModal} />
          <ModalContainer>
            <button className="modal_close_btn" onClick={closeModal}>
              X
            </button>
            {currentPage()}
          </ModalContainer>
        </>
      )}
    </ExpSubsBody>
  );
};

const ExpSubsBody = styled.div`
  background-image: url(${expSubsBackground});
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100vw;
  height: 110vh;
  padding-top: 120px;
`;

const ExpSubsIntro = styled.div`
  color: white;
  float: left;
  margin: 3% 5%;

  > div:nth-child(1) {
    font-size: 30px;
    font-weight: 700;
  }

  > div:nth-child(2) {
    display: flex;
    align-items: flex-end;
    margin-top: 15px;
    font-size: 40px;
    font-weight: 700;
  }
  > div:nth-child(2) > img {
    width: 200px;
  }

  > div:nth-child(3) {
    margin-top: 20px;
    font-size: 40px;
    font-weight: 700;
  }
`;

const GuideLocation = styled.div`
  float: right;
  margin: 6% 5%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  background-color: white;
  padding: 50px 0;
  z-index: 1000;
  border: 5px solid black;

  .modal_close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 25px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .next_page_btn {
    position: absolute;
    bottom: 10%;
    right: 13%;
    padding: 0.7rem 9rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: black;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .before_page_btn {
    position: absolute;
    bottom: 10%;
    left: 16%;
    padding: 0.7rem 4rem;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid black;
    cursor: pointer;
  }
`;

export default ExpSubs;
