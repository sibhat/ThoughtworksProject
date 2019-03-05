from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABcfYiLWtUJUf1DKaPbyY6VukEp5sqNhVk08veAF4mRA3qccXsA_EPHODPS8yVkaJa7PKyXJcDzK1utpiKPW0PGyL7LqJLdJ5yoU6Ce6n4RoJRpdskQ3foZpm6bxYxv-8D_xOjz6r7IcuhH_ulLKhkTfVSAu0qu71MNVFNDzN1JOzz5h3Q='


def main():
    f = Fernet(key)
    print("test")
    print(f.decrypt(message))


def hello():
    print("wait")


if __name__ == "__main__":
    hello()
    main()
