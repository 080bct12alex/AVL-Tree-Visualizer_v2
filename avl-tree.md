# AVL Tree

An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes.



## Implementation

Here's a basic implementation in C++:

```cpp
#include <algorithm>
using std::max;

class Node {
public:
    int value;
    Node* left;
    Node* right;
    int height;

    Node(int val) {
        value = val;
        left = nullptr;
        right = nullptr;
        height = 1;
    }

    static int getHeight(Node* node) {
        return node ? node->height : 0;
    }

    static int getBalance(Node* node) {
        return node ? getHeight(node->left) - getHeight(node->right) : 0;
    }

    static Node* rightRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;

        x->right = y;
        y->left = T2;

        y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
        x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

        return x;
    }

    static Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;

        y->left = x;
        x->right = T2;

        x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
        y->height = max(getHeight(y->left), getHeight(y->right)) + 1;

        return y;
    }

    static Node* minValueNode(Node* node) {
        Node* current = node;
        while (current->left != nullptr)
            current = current->left;
        return current;
    }

    static Node* insert(Node* node, int value) {
        if (node == nullptr)
            return new Node(value);

        if (value < node->value)
            node->left = insert(node->left, value);
        else if (value > node->value)
            node->right = insert(node->right, value);
        else
            return node;

        node->height = max(getHeight(node->left), getHeight(node->right)) + 1;
        int balance = getBalance(node);

        if (balance > 1 && value < node->left->value)
            return rightRotate(node);

        if (balance < -1 && value > node->right->value)
            return leftRotate(node);

        if (balance > 1 && value > node->left->value) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }

        if (balance < -1 && value < node->right->value) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }

        return node;
    }

    static Node* deleteNode(Node* root, int value) {
        if (root == nullptr)
            return root;

        if (value < root->value)
            root->left = deleteNode(root->left, value);
        else if (value > root->value)
            root->right = deleteNode(root->right, value);
        else {
            if (root->left == nullptr || root->right == nullptr) {
                Node* temp = root->left ? root->left : root->right;
                if (temp == nullptr) {
                    temp = root;
                    root = nullptr;
                } else {
                    *root = *temp;
                }
                delete temp;
            } else {
                Node* temp = minValueNode(root->right);
                root->value = temp->value;
                root->right = deleteNode(root->right, temp->value);
            }
        }

        if (root == nullptr)
            return root;

        root->height = max(getHeight(root->left), getHeight(root->right)) + 1;
        int balance = getBalance(root);

        if (balance > 1 && getBalance(root->left) >= 0)
            return rightRotate(root);

        if (balance > 1 && getBalance(root->left) < 0) {
            root->left = leftRotate(root->left);
            return rightRotate(root);
        }

        if (balance < -1 && getBalance(root->right) <= 0)
            return leftRotate(root);

        if (balance < -1 && getBalance(root->right) > 0) {
            root->right = rightRotate(root->right);
            return leftRotate(root);
        }

        return root;
    }
};


```



## Properties
- For each node, the heights of its left and right subtrees differ by at most 1
- All operations (insertion, deletion, search) take O(log n) time
- Balance factor = height(left subtree) - height(right subtree)
- Balance factor must be -1, 0, or 1 for all nodes

## Rotations
- Left Rotation: Used when right subtree becomes higher
- Right Rotation: Used when left subtree becomes higher
- Left-Right Rotation: Combination used for more complex imbalances
- Right-Left Rotation: Combination used for more complex imbalances

## Applications
- Databases where frequent insertions and deletions occur
- Memory management systems
- File systems requiring balanced tree structures
