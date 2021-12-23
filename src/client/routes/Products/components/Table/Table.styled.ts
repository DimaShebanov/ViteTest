import styled from "styled-components";

export const ProductsTable = styled.div`
  display: grid;
  padding-top: 16px;
  //grid-auto-flow: column;
  //grid-auto-columns: 300px;
  grid-auto-rows: 300px;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 6fr repeat(2, 1fr);
  padding: 8px;
  justify-content: center;
  justify-items: center;
  box-shadow: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0,
    rgb(0 0 0 / 12%) 0 1px 3px 0;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
`;

export const Name = styled.p`
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export const Image = styled.div.attrs<{ source: string }>((props) => ({
  style: {
    backgroundImage: `url(${props.source})`,
  },
}))<{ source: string }>`
  background-repeat: no-repeat;
  height: 100%;
  background-size: contain;
  width: 100%;
  background-position: center;
`;
