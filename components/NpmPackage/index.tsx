/*
 * @Date: 2021-11-20 17:07:01
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-11-22 09:08:51
 * @Description: Test package page
 */
import React from "react";
import { defineCustomElements } from "@cosmosreverse/cosmos/loader";
import { TodoList } from "@cosmosreverse/cosmos-react";

/** 测试 Web-Component 组件 */
defineCustomElements();

const TestNpmPackage: React.FC = () => <TodoList todoTitle="hahahah" />;

export default TestNpmPackage;
