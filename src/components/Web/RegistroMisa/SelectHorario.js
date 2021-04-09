import React, { useState } from "react";

import { List, Radio } from "antd";
import "./RegistroMisa.scss";

export default function SelectHorario(props) {
  const { registroData, setRegistroData, misaHorarios } = props;
  const [seatsMaxLocal, setSeatsMaxLocal] = useState(0);

  return (
    <Radio.Group
      onChange={(e) => {
        setRegistroData({
          ...registroData,
          hour: e.target.value,
          maxSeats: seatsMaxLocal,
        });
      }}
      value={registroData.hour}>
      <List
        dataSource={misaHorarios}
        renderItem={(item) => {
          setSeatsMaxLocal(item.maxSeats);
          return (
            <List.Item>
              <Radio value={item.hour}>{item.hour} hrs</Radio>
            </List.Item>
          );
        }}
      />
    </Radio.Group>
  );
}
