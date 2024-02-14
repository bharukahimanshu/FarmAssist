import re
import random


def obfuscate_email(email):
    split = email.split('@')
    split[0] = split[0]+'@'
    obfuscated_string = re.sub(
        r'(?<=^..).*(?=\w{2}@)', '*' * (len(split[0]) - 4), split[0])
    domain_name = split[1]
    domain_name = list(domain_name)
    for i in range(5):
        domain_name[random.randint(0, len(domain_name)-1)] = '*'
    domain_name = ''.join(domain_name)
    return obfuscated_string + domain_name
