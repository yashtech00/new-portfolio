"use client";

import {GitHubCalendar} from "react-github-calendar";

export default function GithubGraph() {
  return (
    <div className="w-full flex justify-center">
      <GitHubCalendar
        username="yashtech00"
        blockSize={14}
        blockMargin={5}
        fontSize={16}
      />
    </div>
  );
}