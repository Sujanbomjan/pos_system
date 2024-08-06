import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TableSkeletalProps {
  columns: number;
  rows: number;
}

const TableSkeletal: React.FC<TableSkeletalProps> = ({ columns, rows }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
      <thead className="bg-gray-100 whitespace-nowrap">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Skeleton width={20} />
          </th>
          {[...Array(columns)].map((_, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <Skeleton width={100} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 whitespace-nowrap">
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td className="px-6 py-2 text-sm">
              <Skeleton width={20} />
            </td>
            {[...Array(columns)].map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4 text-sm">
                <Skeleton height={20} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeletal;
