"use client";
import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTags,
} from "@/utils/doc-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = ({ docs }) => {
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGroup, setRootNodesGroup] = useState({});
  useEffect(() => {
    let matchDocs = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchDocs = getDocumentsByTags(docs, tag);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/2")[2];
      matchDocs = getDocumentsByCategory(docs, category);
    }
    const roots = matchDocs.filter((doc) => !doc.parent);
    const nonRoots = Object.groupBy(
      matchDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRoots);
    nonRootsKeys.forEach((key) => {
      const foundInRoots = roots.find((root) => root.id === key);
      if (!foundInRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });
    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRootNodes([...roots]);
    setRootNodesGroup({ ...nonRoots });
  }, [pathName]);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        <div className=" relative mt-3 pl-2">
          <div className=" absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
          <div className=" absolute inset-y-0 left-2 w-px bg-zinc-900/10 will-change-transform dark:bg-white/5"></div>
          <div className=" absolute h-6 left-2 w-px bg-emerald-500"></div>
        </div>
        <ul role="list" className="border-l border-transparent">
          {rootNodes.map((rootNode) => (
            <li key={rootNode.id} className="relative">
              <Link
                aria-current="page"
                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                href={`/docs/${rootNode.id}`}
              >
                <span className="truncate">{rootNode.title}</span>
              </Link>
              {nonRootNodesGroup[rootNode.id] && (
                <ul role="list" className=" border-l border-transparent">
                  {nonRootNodesGroup[rootNode.id].map((subRoot) => (
                    <li key={subRoot.id}>
                      <Link
                        aria-current="page"
                        className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-zinc-900 dark:hover:text-white"
                        href={`/docs/${rootNode.id}/${subRoot.title}`}
                      >
                        {" "}
                        <span className="truncate">{subRoot.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
};

export default SideBar;
