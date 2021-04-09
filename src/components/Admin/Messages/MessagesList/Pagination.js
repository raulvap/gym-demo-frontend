import React from "react";

import { Pagination as PaginationAntd } from "antd";

import "./MessagesLists.scss";

export default function PaginationMessages(props) {
  const { messages, location, history } = props;

  const currentPage = parseInt(messages.page);
  const totalMessages = messages.total;
  const pageLimit = messages.limit;
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <PaginationAntd
        className='pagination-messages'
        defaultCurrent={currentPage}
        total={totalMessages}
        pageSize={pageLimit}
        onChange={(newPage) => onChangePage(newPage)}
      />
    </div>
  );
}
