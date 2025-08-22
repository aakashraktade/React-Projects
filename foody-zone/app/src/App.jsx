import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SearchResult from "./Components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("unable to fetch data");
      }
    };

    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "BreakFast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <Logo>
            <img src="/logo.svg" alt="logo" />
          </Logo>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filteredFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      {/* Animated Search Results */}
      <ResultsWrapper>
        <SearchResult data={filteredData} />
      </ResultsWrapper>
    </>
  );
};

export default App;

/* ---------------- STYLED COMPONENTS ---------------- */

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      transition: all 0.3s ease;

      &::placeholder {
        color: white;
      }

      &:focus {
        box-shadow: 0 0 10px rgba(255, 67, 67, 0.8);
        outline: none;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

/* 🔥 Button with hover animation */
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#a90000" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #a90000;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

/* ✨ Animate filter container buttons entrance */
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
`;

/* 🎬 Fade + slide animation for results */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ResultsWrapper = styled.div`
  animation: ${fadeInUp} 0.5s ease-in-out;
`;

/* 🎉 Logo bounce animation */
const bounce = keyframes`
  0% { transform: scale(0.9); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Logo = styled.div`
  img {
    height: 50px;
    animation: ${bounce} 0.6s ease;
  }
`;
