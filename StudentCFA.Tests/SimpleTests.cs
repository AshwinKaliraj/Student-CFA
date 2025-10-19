using Xunit;

namespace StudentCFA.Tests
{
    public class SimpleTests
    {
        [Fact]
        public void Test_Addition()
        {
            Assert.Equal(4, 2 + 2);
        }

        [Fact]
        public void Test_String()
        {
            Assert.Equal("Hello", "Hello");
        }

        [Fact]
        public void Test_Boolean()
        {
            Assert.True(true);
        }
    }
}
