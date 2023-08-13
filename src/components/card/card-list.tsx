import { ContactsFilled, HeartFilled } from "@ant-design/icons";
import { Col, Grid, Row } from "antd";
import { css } from "@emotion/react";
import { IContact } from "@/src/constant/form-contant";
import Card from ".";

const { useBreakpoint } = Grid;

interface IProps {
  count: number;
  favContactList: number;
}

function CardList({ count, favContactList }: IProps) {
  const mq = useBreakpoint();
  return (
    <Row gutter={[16, 16]}>
      <Col span={mq.lg ? 8 : mq.md ? 12 : 24}>
        <Card
          title="Regular Contact Count"
          content={(count || "-").toString()}
          icon={
            <ContactsFilled
              css={css`
                font-size: 60px;
                color: #19cb3c;
                position: absolute;
                top: ${mq.xs ? "55%" : "50%"};
                right: 2rem;
                transform: translateY(-50%);
              `}
            />
          }
        />
      </Col>
      <Col span={mq.lg ? 8 : mq.md ? 12 : 24}>
        <Card
          title="Favorite Contact Count"
          content={favContactList.toString()}
          icon={
            <HeartFilled
              css={css`
                font-size: 60px;
                color: #ff7f7f;
                position: absolute;
                top: ${mq.xs ? "55%" : "50%"};
                right: 2rem;

                transform: translateY(-50%);
              `}
            />
          }
        />
      </Col>
    </Row>
  );
}

export default CardList;
