import React from "react";
import styled, { keyframes } from "styled-components";
import { BASE_URL, Button, Container } from "../App";

const SearchResult = ({ data }) => {
  return (
    <div>
      <FoodCardsContainer>
        <Container>
          <FoodCards>
            {data?.map((food, i) => (
              <FoodCard key={food.name} delay={i * 0.1}>
                <div className="food_img">
                  <img src={BASE_URL + food.image} alt="n" />
                </div>
                <div className="food_info">
                  <div className="info">
                    <h3>{food.name}</h3>
                    <p>{food.text}</p>
                  </div>
                  <div>
                    <Button>{"$" + food.price.toFixed(2)}</Button>
                  </div>
                </div>
              </FoodCard>
            ))}
          </FoodCards>
        </Container>
      </FoodCardsContainer>
    </div>
  );
};

export default SearchResult;

// 🔹 Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const FoodCardsContainer = styled.section`
  min-height: calc(100vh - 210px);
  background-image: url("/bg.png");
  background-size: cover;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const FoodCard = styled.div`
  border: 1px solid transparent;   /* always 1px */
  width: 340px;
  height: 167px;

  border-image-source: radial-gradient(
      80.69% 288.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    )
    radial-gradient(
      80.38 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: radial-gradient(
    90.16% 143.01% at 15.32% 21.04%,
    rgba(165, 239, 255, 0.2),
    rgba(110, 191, 244, 0.45) 77.08%,
    rgba(70, 144, 213, 0) 100%
  );

  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);
  border-radius: 20px;

  display: flex;
  padding: 8px;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    border-color: #fff;  /* just change color, not thickness */
  }

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
    }

    button {
      font-size: 12px;
    }
  }
`;

