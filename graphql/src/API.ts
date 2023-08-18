/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  stuff?: string | null,
};

export type Item = {
  __typename: "Item",
  id?: string | null,
  stuff?: string | null,
};

export type UpdateItemInput = {
  id: string,
  stuff?: string | null,
};

export type CreateItemMutationVariables = {
  input?: CreateItemInput | null,
};

export type CreateItemMutation = {
  createItem?:  {
    __typename: "Item",
    id?: string | null,
    stuff?: string | null,
  } | null,
};

export type DeleteItemMutationVariables = {
  id: string,
};

export type DeleteItemMutation = {
  deleteItem?:  {
    __typename: "Item",
    id?: string | null,
    stuff?: string | null,
  } | null,
};

export type UpdateItemMutationVariables = {
  input?: UpdateItemInput | null,
};

export type UpdateItemMutation = {
  updateItem?:  {
    __typename: "Item",
    id?: string | null,
    stuff?: string | null,
  } | null,
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem?:  {
    __typename: "Item",
    id?: string | null,
    stuff?: string | null,
  } | null,
};
