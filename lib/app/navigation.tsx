import React from "react";
import history from "./history";
import { getStoryTree } from "./story-name";
import { stories } from "./list";
import type { StoryTreeT } from "../types";

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      history.push(href);
    }}
  >
    {children}
  </a>
);

const Navigation: React.FC = () => {
  const storyTree = getStoryTree(Object.keys(stories));
  console.log(storyTree);
  return (
    <ul>
      <NavigationSection tree={storyTree} />
    </ul>
  );
};

const NavigationSection: React.FC<{
  tree: StoryTreeT;
}> = ({ tree }) => {
  return (
    <React.Fragment>
      {Object.keys(tree)
        .sort()
        .map((key) => {
          const treeProps = tree[key];
          return (
            <li key={key}>
              {treeProps.isLinkable ? (
                <Link href={`?story=${treeProps.id}`}>{treeProps.name}</Link>
              ) : (
                treeProps.name
              )}
              {Object.keys(treeProps.children).length > 0 && (
                <ul>
                  <NavigationSection tree={treeProps.children} />
                </ul>
              )}
            </li>
          );
        })}
    </React.Fragment>
  );
};

export default Navigation;